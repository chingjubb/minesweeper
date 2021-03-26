import React, { useState, useEffect } from "react";
import { AddUserButton, SelectUserButton } from './add_user_button';
import { useLightReducer,
		 LightState,
		 ActionTypes,
		 LightCountMap,
		 User,
		 Light,
		 Ceremony } from './light_reducer';
import { SelectUserModal } from './select_user_modal';
import { CeremonyLightTable } from './ceremony_light_table';
import { NewUserModal } from './new_user_modal';
import { SelectCeremonyLocationPage } from './select_ceremony_location_page';
import { PhoneForm,
		 NameForm,
		 FindMemberForm,
		 SuccessPagePayAtCounter,
		 SuccessPagePayOnline } from './name_and_phone_form';
import { FindMemberModal, Member } from './find_member_modal';

type Props = {
};

const showFindMemberForm = true; // 內部員工才可以使用的ＦＯＲＭ
const hasPayOnlineButton = false;

export const CeremonyLightPage = (props: Props) => {
	const initialState: LightState = { allUsers: [],
									   users: { } as Map<string, LightCountMap>,
									   allLocations: [],
									   allCeremonies: [],
									   allLights: [],
									   userName: '',
									   phoneNumber: '',
									  };
	console.log(props);								 
	const [state, dispatch] = useLightReducer(initialState);
	const [showNewUserModal, setShowNewUserModal] = useState(false);
	const [showSelectUserModal, setShowSelectUserModal] = useState(false);
	const selectedIdentifiers = Object.keys(state.users);
	const [isLoadingFindByPhone, setIsLoadingFindByPhone] = useState(false);
	const [isLoadingFindByMemberName, setIsLoadingFindByMemberName] = useState(false);
	const [isLoadingPayAtCounter, setIsLoadingPayAtCounter] = useState(false);
	const [isLoadingPayOnline, setIsLoadingPayOnline] = useState(false);

	useEffect(()=>{
		loadAllLocations();
		loadAllCeremonies();
	}, []);
	const loadAllLocations = () => {
		fetch('https://maitreya-tw.com/api/get_locations/1')
			.then(res => res.json())
			.then(json => {
				console.log('fetch loadAllLocations!!! got json', json);
				dispatch({type: ActionTypes.loadAllLocations, allLocations: json});
			});
	}
	const loadAllCeremonies = () => {
		fetch('https://maitreya-tw.com/api/get_celemonies')
			.then(res => res.json())
			.then(json => {
				const allCeremonies: Ceremony[] = json as Ceremony[];
				console.log('fetch loadAllCeremonies!!! got json', allCeremonies);
				dispatch({type: ActionTypes.loadAllCeremonies, allCeremonies});
			});
	}

	// 載入點燈人紀錄
	const loadUserListByPhone = (phoneNumber) => {
		fetch('https://maitreya-tw.com/api/get_blessing_recs_by_cellphone/' + phoneNumber)
			.then(res => res.json())
			.then(json => {
				if (json.constructor === Object && Object.keys(json).length === 0) {
					console.log('no users');
					return;
				} else {
					const users: User[] = json as User[];
					console.log('fetch loadUsers!!! got json', users);
					dispatch({type: ActionTypes.loadUsers, users});
				}
			});
	}

	const [selectedMemberId, setSelectedMemberId] = useState('-1');

	const loadUserListByUserId = (memberId) => {
		fetch('https://maitreya-tw.com/api/get_blessing_recs/' + memberId)
			.then(res => res.json())
			.then(json => {
				if (json.constructor === Object && Object.keys(json).length === 0) {
					console.log('no users');
					return;
				} else {
					const users: User[] = json as User[];
					console.log('fetch loadUsers!!! got json', users);
					dispatch({type: ActionTypes.loadUsers, users});
				}
			});
	}

	const checkUserWithPhoneNumber = (phoneNumber) => {
		setIsLoadingFindByPhone(true);
		fetch('https://maitreya-tw.com/api/check_user/' + phoneNumber)
			.then(res => res.json())
			.then(json => {
				const status = json['status'];
				const type = json['type'];
				const userName = json['name'];
				const count = json['count'] ?? 0;
				if (userName && userName.length > 0) {
					dispatch({type: 'setCurrentUserName', userName });
				}
				dispatch({type: 'setCurrentUserStatus', currentUserStatus: status });
				dispatch({type: 'setCurrentUserType', currentUserType: type });
				if (count > 0) {
					loadUserListByPhone(phoneNumber); // 載入點燈人紀錄
				}
				setIsLoadingFindByPhone(false);
			});
	}

	const [members, setMembers] = useState<Member[]>([]);
	const [memberFound, setMemberFound] = useState(false);

	const selectUserWithMemberId = (memberId: string) => {
		fetch('https://maitreya-tw.com/api/select_user/' + memberId)
			.then(res => res.json())
			.then(json => {
				const status = json['status'];
				const type = json['type'];
				const userName = json['name'];
				// const count = json['count'] ?? 0;
				if (userName && userName.length > 0) {
					dispatch({type: 'setCurrentUserName', userName });
				}
				dispatch({type: 'setCurrentUserStatus', currentUserStatus: status });
				dispatch({type: 'setCurrentUserType', currentUserType: type });
				loadUserListByUserId(memberId);
				setSelectedMemberId(memberId);
				setMemberFound(true);
				setMembers([]);
			});
	}

	async function postData (url = '', data = {}) {
		  // Default options are marked with *
		const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}

	const findMemberByName = (userName: string) => {
		setIsLoadingFindByMemberName(true)
		postData('https://maitreya-tw.com/api/user_list', { 'keyword': userName })
		.then(data => {
			console.log('findMemberByName get back data', data); // JSON data parsed by `data.json()` call
			const keys = Object.keys(data);
			const theMembers: Member[] = [];
			keys.forEach((key: string) => {
				const name = data[key];
				if (name && key) {
					theMembers.push({ id: key, name });
				}
			})
			setMembers(theMembers);
			setIsLoadingFindByMemberName(false);
			console.log('members', members);
		});
	}

	console.log('state', state);

	if (state.success && state.onlinePayUrl?.length > 0) {
		return <SuccessPagePayOnline confirmationNumber={state.confirmationNumber}
									 onlinePayUrl={state.onlinePayUrl} />;
	}

	if (state.success) {
		return <SuccessPagePayAtCounter confirmationNumber={state.confirmationNumber} />;
	}

	if ((state.phoneNumber.length === 0 && !memberFound) || isLoadingFindByPhone) {
		return <div>
					<PhoneForm onPhoneNumberChange={(phoneNumber: string) => {
							 	  dispatch({type: 'setPhoneNumber', phoneNumber });
							 	  checkUserWithPhoneNumber(phoneNumber);
							  }}
							  buttonDisabled={isLoadingFindByPhone}
							  buttonLabel={isLoadingFindByPhone ? '載入中...': '下一步'}
				    />
				    {showFindMemberForm &&
			    		<FindMemberForm
			    			buttonDisabled={isLoadingFindByMemberName}
			    			buttonLabel={isLoadingFindByMemberName ? '載入中...': '下一步'}
			    			onClick={(userName: string) => {
						 		console.log('find member', userName);
						 		findMemberByName(userName);
						  	}}
				    />}
				    <FindMemberModal
				    	members={members}
					    onClick={(memberId: string) => {
					    	selectUserWithMemberId(memberId);
					    }}
					    onClose={()=>{ setMembers([])}}
					    open={members.length > 0} />
			   </div>
	} else if ((state.currentUserStatus === 0 || !state.currentUserStatus)
				&& state.userName?.length === 0) {
		return <NameForm onUserNameChange={(userName: string) => {
						 	  dispatch({type: 'setCurrentUserName', userName });
						  }}
			   />
	}

	if (state.allLocations.length === 0 || state.allCeremonies.length === 0) {
		return <div style={{margin: 'auto', marginTop:'40%'}}>載入中...</div>
	}

	if (state.allLocations.length > 0 &&
		state.allCeremonies.length > 0 &&
		!state.ceremony &&
		!state.location) {
		return <SelectCeremonyLocationPage dispatch={dispatch}
								  		   allLocations={state.allLocations}
								  		   allCeremonies={state.allCeremonies} />;
	}

	const onSubmitSelectUserModal = (newSelectedUserIdentifier: string[]) => {
		newSelectedUserIdentifier.forEach((identifier) => {
			if (selectedIdentifiers.includes(identifier)) {
				// Do nothing
			} else {
				dispatch({ type: ActionTypes.selectUser, userName: identifier });
			}
		});
		selectedIdentifiers.forEach((identifier) => {
			if (newSelectedUserIdentifier.includes(identifier)) {
				// Do nothing
			} else {
				dispatch({ type: ActionTypes.removeUserFromLight, userName: identifier });
			}
		})
		setShowSelectUserModal(false);
	}

	const getFormData = (payType: number) => { // 0: 櫃檯結帳, 1: 線上付款
		console.log('getSessionData', getSessionData());
		const locid = window.location.pathname?.replace('/', '') ?? -1;
		console.log('new locid is ', locid);
		const formData: any = { 'session_data': getSessionData(),
								'price': getTotalPrice(),
								'lighting_num': getTotalNumLight(),
								'locid': locid,
								'contact_name': state.userName,
								'contact_phone': state.phoneNumber,
								'check_user': state.currentUserStatus,
								'check_user_type': state.currentUserType,
								'lighting_locid': state.location.id,
								'celemony_code': state.ceremony.id,
								'L108': state.L108 ? 1 : 0, // 108燈
								'Lking': state.Lking ? 1: 0, // 燈王
								'family': state.family ? 1: 0, // 是否顯示闔家
								'pay_type': payType, // 0: 櫃檯結帳, 1: 線上付款
						   	  };
		if (showFindMemberForm) {
			formData['cusid'] = selectedMemberId;
		} else {
			formData['cusid'] = -1;
		}
		return formData;
	}

	const removeSpecialCharacters = (text: string) => {
		while (text.includes('@') || text.includes('^') || text.includes('|')) {
		       text = text.replace('^', ',').replace('@', ',').replace('|', ',');
		}
		return text;
	};

	const getNumLightForUser = (lightCountMap: LightCountMap | undefined, allLights: Light[]) => {
		if (!lightCountMap) {
			return 0;
		}
		const lightNames: string[] = Object.keys(lightCountMap);
		let count = 0;
		lightNames.forEach((lightName: string) => {
			const theLight: Light | undefined = allLights.find((light: Light) => light.name === lightName);
			if (theLight) {
				count += lightCountMap[lightName] ?? 0;
			}
		});
		return count;
	}

	const getSessionData = () => {
		let data: string[] = [];
		const identifiers = Object.keys(state.users);
		const lightKingOr108Lights = state.L108 || state.Lking; // 是否點燈王或108燈
		const lighting_locid = state.location.id;

		identifiers.forEach((identifier: string) => {
			let user = state.allUsers.find((u) => u.id?.toString() === identifier);
			if (!user) {
				user = state.allUsers.find((u) => u.name === identifier);
			}
			if (user) {
				const lightCountMap: LightCountMap | undefined = state.users[identifier];
				const num = getNumLightForUser(lightCountMap, state.allLights);
				const comment = removeSpecialCharacters(user.comment ?? '');

				if (num > 0 || lightKingOr108Lights) {
					let data1 = `${user.name}@${user.birth_cal}@${user.birth_year}@${user.birth_month}@${user.birth_day}@${user.address}@${lighting_locid}@${comment}@`
					const countData: string[] = [];
					state.allLights.forEach((light: Light) => {
						const count = lightCountMap ? (lightCountMap[light.name] ?? 0) : 0;
						countData.push(`${count}`);
					});
					data1 += countData.join('^')
					data1 += '@'
					const lightIDs: string[] = state.allLights.map((light) => light.id.toString());
					data1 += lightIDs.join('^');
					data1 += `@${Date.now()}@${state.ceremony.id}`;
					data.push(data1);
				}
			}
		});
		return data.join('|');
	}

	console.log('getSessionData', getSessionData());

	const onSubmit = (payType: number) => {
		console.log('click onSubmit the light table!!', getFormData(payType));
		postData('https://maitreya-tw.com/api/celemony_request_store', getFormData(payType))
		.then(data => {
			console.log('on submit get back data', data); // JSON data parsed by `data.json()` call
			const successful: boolean = data['status'] === 1;
			const confirmationNumber: string = data['result'] ?? '';
			const onlinePayUrl: string = data['online_pay_url'] ?? '';
			console.log('onlinePayUrl', onlinePayUrl);
			if (successful) {
				console.log("success!! confirmationNumber=", confirmationNumber);
				dispatch({type: 'setSuccess',
						  success: true,
						  confirmationNumber,
						  onlinePayUrl });
			} else {
				console.log("failed!!");
			}
			setIsLoadingPayOnline(false);
			setIsLoadingPayAtCounter(false);
		});
	}

	const getTotalPrice = () => {
		let total = 0;
		const identifiers = Object.keys(state.users);
		identifiers.forEach((identifier: string) => {
			const lightCountMap: LightCountMap | undefined = state.users[identifier];
			if (lightCountMap) {
				const subtotal = getSubTotal(lightCountMap, state.allLights);
				total += subtotal;
			}
		});
		if (state.L108) {
			total = 200 * 108;
		} else if (state.Lking) {
			total = 200 * 108 * 12;
		}
		return total;
	}
	const getTotalNumLight = () => {
		let totalCount = 0;
		const identifiers = Object.keys(state.users);
		identifiers.forEach((identifier: string) => {
			const lightCountMap: LightCountMap | undefined = state.users[identifier];
			if (lightCountMap) {
				const num = getNumLightForUser(lightCountMap, state.allLights);
				totalCount += num;
			}
		});
		return totalCount;
	}

	const getSubTotal = (lightCountMap: LightCountMap, allLights: Light[]): number => {
		const lightNames: string[] = Object.keys(lightCountMap);
		let subtotal = 0;
		lightNames.forEach((lightName: string) => {
			const theLight: Light | undefined = allLights.find((light: Light) => light.name === lightName);
			if (theLight) {
				const count = lightCountMap[lightName] ?? 0;
				subtotal += count * theLight.price;
			}
		});
		return subtotal;
	}

	return (
		<div style={{ margin: 50, marginLeft: 30, marginTop: 20}}>
			{state.location && <div style={{fontSize: 18, marginBottom: 5}}>點燈地點：{state.location.name}</div>}
			{state.ceremony && <div style={{fontSize: 18, marginBottom: 5}}>法會場次：{state.ceremony.name}</div>}
			{state.userName && <div style={{fontSize: 18, marginBottom: 20}}>聯絡人：{state.userName}大德</div>}
			{state.allUsers.length > 0 && <SelectUserButton onClick={() => { setShowSelectUserModal(true) }} />}
			<AddUserButton onClick={() => { setShowNewUserModal(true) }} />

			<NewUserModal dispatch={dispatch}
						  key={'NewUserModal' + state.allUsers.length}
						  onClose={() => { setShowNewUserModal(false) }}
						  open={showNewUserModal} />

			<SelectUserModal open={showSelectUserModal}
							 key={'SelectUserModal' +
							 	   state.allUsers.length.toString() +
							 	   Object.keys(state.users).length.toString()}
							 allUsers={state.allUsers}
							 onSubmit={onSubmitSelectUserModal}
							 selectedNames={selectedIdentifiers}
							 onClose={() => { setShowSelectUserModal(false) }} />

			<CeremonyLightTable users={state.users}
						allLights={state.allLights}
						dispatch={dispatch}
						L108={!!state.L108}
						Lking={!!state.Lking}
						family={!!state.family}
						onSubmitPayAtCounter={() => { 
							setIsLoadingPayAtCounter(true);
							onSubmit(0);
						}}
						onSubmitPayOnline={() => {
							setIsLoadingPayOnline(true);
							onSubmit(1); 
						}}
						isLoadingPayAtCounter={isLoadingPayAtCounter}
						isLoadingPayOnline={isLoadingPayOnline}
						location={state.location}
						hasPayOnlineButton={hasPayOnlineButton}
						allUsers={state.allUsers} />
		</div>
	);
};

import React, { useState, useEffect } from "react";
import { AddUserButton, LoadUserButton, SelectUserButton } from './add_user_button';
import { useLightReducer,
		 LightState,
		 ActionTypes,
		 LightCountMap,
		 User,
		 Ceremony } from './light_reducer';
import { SelectUserModal } from './select_user_modal';
import { CeremonyLightTable } from './ceremony_light_table';
import { NewUserModal } from './new_user_modal';
import { SelectLocationPage } from './select_location_page';
import { PhoneForm, NameForm } from './name_and_phone_form';

type Props = {

};

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
	const selectedNames = Object.keys(state.users);

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
	const loadUsers = () => {
		fetch('https://maitreya-tw.com/api/get_blessing_recs_by_cellphone/' + state.phoneNumber)
			.then(res => res.json())
			.then(json => {
				if (json.constructor === Object && Object.keys(json).length === 0) {
					console.log('no users');
					return;
				} else {
					const users: User[] = json as User[];
					console.log('fetch loadUsers!!! got json', users);
					dispatch({type: ActionTypes.loadUsers, users});
					setShowSelectUserModal(true);
				}
			});
	}

	const checkUser = (phoneNumber) => {
		fetch('https://maitreya-tw.com/api/check_user/' + phoneNumber)
			.then(res => res.json())
			.then(json => {
				const status = json['status'];
				const type = json['type'];
				console.log('status', status);
				console.log('type', type);
				dispatch({type: 'setCurrentUserStatus', currentUserStatus: status });
				dispatch({type: 'setCurrentUserType', currentUserType: type });
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

	console.log('state', state);

	// fetch('https://maitreya-tw.com/api/celemony_request_store', {
	// 	method: 'POST', // or 'PUT'
	// 	headers: {
	// 	'Content-Type': 'application/json',
	// 	},
	// 	body: JSON.stringify({session_data: 1}),
	// })
	// .then(response => response.json())
	// .then(data => {
	// 	console.log('Success:', data);
	// })
	// .catch((error) => {
	// 	console.error('Error:', error);
	// });

	if (state.phoneNumber.length === 0) {
		return <PhoneForm onPhoneNumberChange={(phoneNumber: string) => {
						 	  dispatch({type: 'setPhoneNumber', phoneNumber });
						 	  checkUser(phoneNumber);
						  }}
			   />
	} else if ((state.currentUserStatus === 0 || !state.currentUserStatus)
				&& state.userName.length === 0) {
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
		return <SelectLocationPage dispatch={dispatch}
								   allLocations={state.allLocations}
								   allCeremonies={state.allCeremonies} />;
	}

	const onSubmitSelectUserModal = (newSelectedNames: string[]) => {
		newSelectedNames.forEach((name) => {
			if (selectedNames.includes(name)) {
				// Do nothing
			} else {
				dispatch({ type: ActionTypes.selectUser, userName: name });
			}
		});
		selectedNames.forEach((name) => {
			if (newSelectedNames.includes(name)) {
				// Do nothing
			} else {
				dispatch({ type: ActionTypes.removeUserFromLight, userName: name });
			}
		})
		setShowSelectUserModal(false);
	}

	const getFormData = () => {
		return { 'session_data': 1,
				 'price': 1000,
				 'lighting_num': 1,
				 'locid': 1,
				 'contact_name': '',
				 'contact_phone': '123123',
				 'check_user': 0,
				 'check_user_type': 0,
				 'lighting_locid': 12,
				 'celemony_code': '1100119' }
	}

	const onSubmit = () => {
		console.log('click onSubmit the light table!!');
		postData('https://maitreya-tw.com/api/celemony_request_store', getFormData())
		.then(data => {
			console.log('on submit data', data); // JSON data parsed by `data.json()` call
		});
	}

	return (
		<div style={{ margin: 50, marginLeft: 30}}>
			{state.allUsers.length > 0 && <SelectUserButton onClick={() => { setShowSelectUserModal(true) }} />}
			<AddUserButton onClick={() => { setShowNewUserModal(true) }} />

			<LoadUserButton onClick={loadUsers} />

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
							 selectedNames={selectedNames}
							 onClose={() => { setShowSelectUserModal(false) }} />

			<div style={{marginTop:'20px'}}>
				<CeremonyLightTable users={state.users}
							allLights={state.allLights}
							dispatch={dispatch}
							onSubmit={onSubmit}
							location={state.location}
							allUsers={state.allUsers} />
			</div>
		</div>
	);
};

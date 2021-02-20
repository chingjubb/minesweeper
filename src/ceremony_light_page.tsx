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

type Props = {

};

export const CeremonyLightPage = (props: Props) => {
	const initialState: LightState = { allUsers: [],
									   users: { } as Map<string, LightCountMap>,
									   allLocations: [],
									   allCeremonies: [],
									   allLights: [],
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
		fetch('https://maitreya-tw.com/api/get_blessing_recs/1576')
			.then(res => res.json())
			.then(json => {
				const users: User[] = json as User[];
				console.log('fetch loadUsers!!! got json', users);
				dispatch({type: ActionTypes.loadUsers, users});
				setShowSelectUserModal(true);
			});
	}

	console.log('state', state);

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
							location={state.location}
							allUsers={state.allUsers} />
			</div>
		</div>
	);
};

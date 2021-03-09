import React, { useState, useEffect } from "react";
import { AddYearLightButton } from './add_user_button';
import { useLightReducer,
		 LightState,
		 ActionTypes,
		 LightCountMap,
		 Light,
		 YearLight,
		 User } from './light_reducer';
import { YearLightTable } from './year_light_table';
import { SelectLightModal } from './select_light_modal';
import { SubmitLightButton, GoBackToSelectPage } from './add_user_button';

type Props = {

};

export const YearLightPage = (_props: Props) => {
	const initialState: LightState = { allUsers: [],
									   users: { } as Map<string, LightCountMap>,
									   allLocations: [],
									   allCeremonies: [],
									   allLights: [],
									   yearLights: [],
									  };

	const [state, dispatch] = useLightReducer(initialState);

	useEffect(()=>{
		loadAllLocations();
		loadAllYearLights();
		loadUsers();
	}, []);
	const loadAllYearLights = () => {
		fetch('https://maitreya-tw.com/api/get_celemony_items/1100101')
			.then(res => res.json())
			.then(json => {
				console.log('fetch loadAllLightsFromApi!!! got json', json);
				const allLights: Light[] = json as Light[];
				if (dispatch) {
					dispatch({type: ActionTypes.loadAllLights, allLights});
				}
			});
	}
	const loadAllLocations = () => {
		fetch('https://maitreya-tw.com/api/get_locations/1')
			.then(res => res.json())
			.then(json => {
				console.log('fetch loadAllLocations!!! got json', json);
				dispatch({type: ActionTypes.loadAllLocations, allLocations: json});
			});
	}
	const loadUsers = () => {
		fetch('https://maitreya-tw.com/api/get_blessing_recs/1576')
			.then(res => res.json())
			.then(json => {
				const users: User[] = json as User[];
				console.log('fetch loadUsers!!! got json', users);
				dispatch({type: ActionTypes.loadUsers, users});
			});
	}

	console.log('state', state);

	const [showModal, setShowModal] = useState(false);

	const onSubmit = (lightCountMap: LightCountMap) => {
		setShowModal(false);
		const lightNames: string[] = lightCountMapToLightNames(lightCountMap);
		dispatch({type: ActionTypes.selectYearLights, lightNames })
	}

	let totalPrice = 0;
	let allLightHasName = true;
	state.yearLights.forEach((yearLight: YearLight) => {
		const yearLightName = yearLight.lightName;
		const light: Light = state.allLights.find((light: Light) => light.name === yearLightName);
		const price = light?.price ?? 0;
		totalPrice += price;
		allLightHasName = allLightHasName && (yearLight.userNames.length > 0);
	});

	return (
		<div style={{ margin: 50}}>
			<AddYearLightButton onClick={() => { setShowModal(true) }} />
			{showModal && <SelectLightModal onClose={()=>{ setShowModal(false)}}
											allLights={state.allLights}
											open={showModal}
											onSubmit={onSubmit}
											lightCountMap={{} as  LightCountMap} />}
			<div style={{marginTop:'20px'}}>
				<YearLightTable allLights={state.allLights}
								dispatch={dispatch}
								yearLights={state.yearLights}
								location={state.location}
								allUsers={state.allUsers} />
			</div>
			{totalPrice > 0 && <div style={{marginTop: 20}}>總價： {totalPrice}元</div>}
			{totalPrice > 0 &&
				<div style={{marginTop: 20, display: 'flex', justifyContent: 'center' }}>
					<SubmitLightButton disabled={totalPrice <= 0 || !allLightHasName} />
					<GoBackToSelectPage onClick={() => { window.location.reload(); }}/>
				</div>}
		</div>
	);
};

export const lightCountMapToLightNames = (lightCountMap: LightCountMap): string[] => {
	// e.g { 'abc': 1, 'xyz': 2 } => ['abc', 'xyz', 'xyz']
	let lightNames: string[] = [];
	const keys: string[] = Object.keys(lightCountMap);
	keys.forEach((key: string) => {
		const lightName: string = key;
		const count: number = lightCountMap[lightName];
		if (count > 0) {
			for (let i = 0; i < count; i++) {
				lightNames.push(lightName);
			}
		}
	})
	return lightNames;
};

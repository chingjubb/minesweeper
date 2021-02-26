import { useReducer, Dispatch } from 'react';
import { produce } from 'immer';

export type LightState = {
	userName?: string;
	phoneNumber?: string;
	currentUserStatus?: number;
	currentUserType?: number;
	allUsers: User[];
	allLights: Light[];
	users: Map<string, LightCountMap>; // 法會燈的選擇 For ceremony: user name to a light count map
	allLocations: Location[];
	allCeremonies: Ceremony[];
	location?: Location; // selected location
	ceremony?: Ceremony; // selected ceremony
	yearLights?: YearLight[]; // 年度燈的選擇 For annual light
};

export type YearLight = {
	lightName: string;
	userNames: string[];
}

export type Location = { // 地點，例如：台北 陀彌天山 紫竹林寺
	id: number; // id from the backend
	name: string;
}

export type Ceremony = { // 法會，例如：南無 彌勒尊佛 佛誕日
	id: string; // id from the backend
	name: string;
}

export type LightCountMap = Map<string, number>; // light name to number of light

export type User = { // 點燈者
	id?: number; // id from the backend
	name: string;
	birth_cal?: string | number; // 1 -> 國曆, 0 -> 農曆
	birth_year?: string | number;
	birth_month?: string | number;
	birth_day?: string | number;
	address?: string;
	comment?: string;
};

export type Light = { // 燈陣
	id?: number; // id from the backend
	name: string;
	functional?: string;
	content?: string;
	price: number;
	series?: number;
}

export const ActionTypes = {
	addNewUser: 'addNewUser',
	selectUser: 'selectUser',
	updateLightCountMapForUser: 'updateLightCountMapForUser',
	removeUserFromLight: 'removeUserFromLight',
	loadAllLights: 'loadAllLights',
	loadAllLocations: 'loadAllLocations',
	loadAllCeremonies: 'loadAllCeremonies',
	setLocation: 'setLocation',
	setCeremony: 'setCeremony',
	loadUsers: 'loadUsers',
	// For Year Light
	selectYearLights: 'selectYearLights',
	deleteYearLightAt: 'deleteYearLightAt',
	setYearLightUsersAt: 'setYearLightUsersAt',
	setCurrentUserName: 'setCurrentUserName',
	setPhoneNumber: 'setPhoneNumber',
	setCurrentUserStatus: 'setCurrentUserStatus',
	setCurrentUserType: 'setCurrentUserType',
} as const;

export type LightAction =
	| {
			type: typeof ActionTypes.addNewUser;
			user: User;
	  }
	| {
			type: typeof ActionTypes.updateLightCountMapForUser;
			userName: string;
			lightCountMap: LightCountMap;
	  }
	| {
			type: typeof ActionTypes.removeUserFromLight;
			userName: string;
	}
	| {
			type: typeof ActionTypes.selectUser;
			userName: string;
	}
	| {
			type: typeof ActionTypes.loadAllLights;
			allLights: Light[];
	}
	| {
			type: typeof ActionTypes.loadAllLocations;
			allLocations: Location[];
	}
	| {
			type: typeof ActionTypes.loadAllCeremonies;
			allCeremonies: Ceremony[];
	}
	| {
			type: typeof ActionTypes.setLocation;
			location: Location;
	}
	| {
			type: typeof ActionTypes.setCeremony;
			ceremony: Ceremony;
	}
	| {
			type: typeof ActionTypes.loadUsers;
			users: User[];
	}
	| {
			type: typeof ActionTypes.selectYearLights;
			lightNames: string[];
	}
	| {
			type: typeof ActionTypes.deleteYearLightAt;
			index: number;
	}
	| {
			type: typeof ActionTypes.setYearLightUsersAt;
			index: number;
			userNames: string[];
	}
	| {
			type: typeof ActionTypes.setCurrentUserName;
			userName: string;
	}
	| {
			type: typeof ActionTypes.setPhoneNumber;
			phoneNumber: string;
	}
	| {
			type: typeof ActionTypes.setCurrentUserStatus; // 0 or 1
			currentUserStatus: number;
	}
	| {
			type: typeof ActionTypes.setCurrentUserType; // 0 or 1
			currentUserType: number;
	};

export const LightReducer = (
	state: LightState,
	action: LightAction,
): LightState => {
	switch (action.type) {
		case 'addNewUser':
			return produce(state, (draft) => {
				console.log('addNewUser', action.user);
				draft.allUsers.push(action.user);
				const lightCountMap: LightCountMap = state.users[action.user.name];
				if (!lightCountMap) {
					draft.users[action.user.name] = { };
				}
			});
		case 'selectUser':
		 	return produce(state, (draft) => {
				console.log('selectUser', action.userName);
				const lightCountMap: LightCountMap = state.users[action.userName];
				if (!lightCountMap) {
					draft.users[action.userName] = { };
				}
			});
		case 'updateLightCountMapForUser':
			return produce(state, (draft) => {
				draft.users[action.userName] = action.lightCountMap;
			});
		case 'removeUserFromLight':
			return produce(state, (draft) => {
				delete draft.users[action.userName]
			});
		case 'loadAllLights':
			return produce(state, (draft) => {
				draft.allLights = action.allLights;
			});
		case 'loadAllLocations':
			return produce(state, (draft) => {
				draft.allLocations = action.allLocations;
			});
		case 'loadAllCeremonies':
			return produce(state, (draft) => {
				draft.allCeremonies = action.allCeremonies;
			});
		case 'setLocation':
			return produce(state, (draft) => {
				console.log('setLocation reducer', action.location);
				draft.location = action.location;
			});
		case 'setCeremony':
			return produce(state, (draft) => {
				console.log('setCeremony reducer', action.ceremony);
				draft.ceremony = action.ceremony;
			});
		case 'loadUsers':
			return produce(state, (draft) => {
				console.log('loadusers reducer', action.users);
				action.users.forEach((user: User) => {
					// Only load the user name that we don't have yet
					const userExists = draft.allUsers.find((u: User) => user.name === u.name)
					if (!userExists) {
						draft.allUsers.push(user);
					}
				});
			});
		// For year lights:
		case 'selectYearLights':
			return produce(state, (draft) => {
				console.log('selectYearLights reducer', action.lightNames);
				action.lightNames.map((lightName: string) => {
					const yearLight: YearLight = { lightName, userNames: [] };
					draft.yearLights.push(yearLight);
				});
			});
		case 'deleteYearLightAt':
			return produce(state, (draft) => {
				draft.yearLights.splice(action.index, 1);
			});
		case 'setYearLightUsersAt':
			return produce(state, (draft) => {
				draft.yearLights[action.index].userNames = action.userNames;
			});
		case 'setCurrentUserName':
			return produce(state, (draft) => {
				draft.userName = action.userName;
			});
		case 'setPhoneNumber':
			return produce(state, (draft) => {
				draft.phoneNumber = action.phoneNumber;
			});
		case 'setCurrentUserStatus':
			return produce(state, (draft) => {
				draft.currentUserStatus = action.currentUserStatus;
			});
		case 'setCurrentUserType':
			return produce(state, (draft) => {
				draft.currentUserType = action.currentUserType;
			});
		
		default:
			return state;
	}
};

// usage example:
// const [state, dispatch] = useLightReducer(initialState);
export const useLightReducer = (
	initialState: LightState,
): [LightState, Dispatch<LightAction>] => {
	const [config, dispatch] = useReducer(
		LightReducer,
		initialState,
	);
	return [config, dispatch];
};

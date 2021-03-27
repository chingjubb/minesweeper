import { useReducer, Dispatch } from "react";
import { produce } from "immer";

export type LightState = {
  userName?: string;
  phoneNumber?: string;
  currentUserStatus?: number;
  currentUserType?: number;
  allUsers: User[];
  allLights: Light[];
  users: Map<string, LightCountMap>; // 法會燈的選擇 For ceremony: user name or id to a light count map
  allLocations: Location[];
  allCeremonies: Ceremony[];
  location?: Location; // selected location
  ceremony?: Ceremony; // selected ceremony
  yearLights?: YearLight[]; // 年度燈的選擇 For annual light
  success?: boolean;
  confirmationNumber?: string; // This is after successful submission
  onlinePayUrl?: string; // This is after successful submission
  L108?: boolean; // 法會燈 全體108燈
  Lking?: boolean; // 法會燈 全體燈王
  family?: boolean; // 法會燈 全體加上闔家 （全體燈王或是108燈才有）
};

export type YearLight = {
  lightName: string;
  userNames: string[];
};

export type Location = {
  // 地點，例如：台北 陀彌天山 紫竹林寺
  id: number; // id from the backend
  name: string; // 例如：台北 陀彌天山 紫竹林寺
};

export type Ceremony = {
  // 法會，例如：南無 彌勒尊佛 佛誕日
  id: string; // id from the backend
  name: string;
};

export type LightCountMap = Map<string, number>; // light name to number of light

export type User = {
  // 點燈者
  id?: number | string; // id from the backend
  name: string;
  birth_cal?: string | number; // 1 -> 國曆, 0 -> 農曆
  birth_year?: string | number;
  birth_month?: string | number;
  birth_day?: string | number;
  address?: string;
  comment?: string;
};

export type Light = {
  // 燈陣
  id?: number; // id from the backend
  name: string;
  functional?: string;
  content?: string;
  price: number;
  series?: number;
};

export const ActionTypes = {
  addNewUser: "addNewUser",
  selectUser: "selectUser",
  updateLightCountMapForUser: "updateLightCountMapForUser",
  removeUserFromLight: "removeUserFromLight",
  loadAllLights: "loadAllLights",
  loadAllLocations: "loadAllLocations",
  loadAllCeremonies: "loadAllCeremonies",
  setLocation: "setLocation",
  setCeremony: "setCeremony",
  loadUsers: "loadUsers",
  // For Year Light
  selectYearLights: "selectYearLights",
  deleteYearLightAt: "deleteYearLightAt",
  setYearLightUsersAt: "setYearLightUsersAt",
  setCurrentUserName: "setCurrentUserName",
  setPhoneNumber: "setPhoneNumber",
  setCurrentUserStatus: "setCurrentUserStatus",
  setCurrentUserType: "setCurrentUserType",
  setSuccess: "setSuccess",
  // For Ceremony light:
  setL108: "setL108",
  setLking: "setLking",
  setFamily: "setFamily"
} as const;

export type LightAction =
  | {
      type: typeof ActionTypes.addNewUser;
      user: User;
    }
  | {
      type: typeof ActionTypes.updateLightCountMapForUser;
      userName: string; // identifier
      lightCountMap: LightCountMap;
    }
  | {
      type: typeof ActionTypes.removeUserFromLight;
      userName: string; // identifier
    }
  | {
      type: typeof ActionTypes.selectUser;
      userName: string; // user id as string or user name if they don't have id
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
      type: typeof ActionTypes.setPhoneNumber; // current user's phone number
      phoneNumber: string;
    }
  | {
      type: typeof ActionTypes.setCurrentUserStatus; // 0 or 1
      currentUserStatus: number;
    }
  | {
      type: typeof ActionTypes.setCurrentUserType; // 0 or 1
      currentUserType: number;
    }
  | {
      type: typeof ActionTypes.setSuccess;
      success: boolean;
      confirmationNumber: string;
      onlinePayUrl: string;
    }
  | {
      type: typeof ActionTypes.setL108;
      L108: boolean;
    }
  | {
      type: typeof ActionTypes.setLking;
      Lking: boolean;
    }
  | {
      type: typeof ActionTypes.setFamily;
      family: boolean;
    };

export const LightReducer = (
  state: LightState,
  action: LightAction
): LightState => {
  switch (action.type) {
    case "addNewUser":
      return produce(state, draft => {
        console.log("addNewUser", action.user);
        draft.allUsers.push(action.user);
        const identifier = action.user.id
          ? action.user.id.toString()
          : action.user.name;
        draft.users[identifier] = {};
      });
    case "selectUser":
      return produce(state, draft => {
        console.log("selectUser", action.userName);
        const identifier = action.userName;
        const lightCountMap: LightCountMap = state.users[identifier];
        if (!lightCountMap) {
          draft.users[identifier] = {};
        }
      });
    case "updateLightCountMapForUser":
      return produce(state, draft => {
        const identifier = action.userName;
        draft.users[identifier] = action.lightCountMap;
      });
    case "removeUserFromLight":
      return produce(state, draft => {
        const identifier = action.userName;
        delete draft.users[identifier];
      });
    case "loadAllLights":
      return produce(state, draft => {
        draft.allLights = action.allLights;
      });
    case "loadAllLocations":
      return produce(state, draft => {
        draft.allLocations = action.allLocations;
      });
    case "loadAllCeremonies":
      return produce(state, draft => {
        draft.allCeremonies = action.allCeremonies;
      });
    case "setLocation":
      return produce(state, draft => {
        console.log("setLocation reducer", action.location);
        draft.location = action.location;
      });
    case "setCeremony":
      return produce(state, draft => {
        console.log("setCeremony reducer", action.ceremony);
        draft.ceremony = action.ceremony;
      });
    case "loadUsers":
      return produce(state, draft => {
        console.log("loadusers reducer", action.users);
        action.users.forEach((user: User) => {
          draft.allUsers.push(user);
        });
      });
    // For year lights:
    case "selectYearLights":
      return produce(state, draft => {
        console.log("selectYearLights reducer", action.lightNames);
        action.lightNames.map((lightName: string) => {
          const yearLight: YearLight = { lightName, userNames: [] };
          draft.yearLights.push(yearLight);
        });
      });
    case "deleteYearLightAt":
      return produce(state, draft => {
        draft.yearLights.splice(action.index, 1);
      });
    case "setYearLightUsersAt":
      return produce(state, draft => {
        draft.yearLights[action.index].userNames = action.userNames;
      });
    case "setCurrentUserName":
      return produce(state, draft => {
        draft.userName = action.userName;
      });
    case "setPhoneNumber":
      return produce(state, draft => {
        draft.phoneNumber = action.phoneNumber;
      });
    case "setCurrentUserStatus":
      return produce(state, draft => {
        draft.currentUserStatus = action.currentUserStatus;
      });
    case "setCurrentUserType":
      return produce(state, draft => {
        draft.currentUserType = action.currentUserType;
      });
    case "setSuccess":
      return produce(state, draft => {
        draft.success = action.success;
        draft.confirmationNumber = action.confirmationNumber;
        draft.onlinePayUrl = action.onlinePayUrl;
      });
    case "setL108":
      return produce(state, draft => {
        draft.L108 = action.L108;
        if (action.L108) {
          draft.Lking = false;
        }
        if (!action.L108 && !draft.Lking) {
          draft.family = false;
        }
      });
    case "setLking":
      return produce(state, draft => {
        draft.Lking = action.Lking;
        if (action.Lking) {
          draft.L108 = false;
        }
        if (!draft.Lking && !action.Lking) {
          draft.family = false;
        }
      });
    case "setFamily":
      return produce(state, draft => {
        draft.family = action.family;
      });
    default:
      return state;
  }
};

// usage example:
// const [state, dispatch] = useLightReducer(initialState);
export const useLightReducer = (
  initialState: LightState
): [LightState, Dispatch<LightAction>] => {
  const [config, dispatch] = useReducer(LightReducer, initialState);
  return [config, dispatch];
};

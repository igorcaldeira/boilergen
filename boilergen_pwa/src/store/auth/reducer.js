import * as Type from "./actionsTypes";

const INITAL_STATE = {
    byId: {},
    error: {}
};

export default function (state = INITAL_STATE, action) {
    switch (action.type) {
        case Type.FETCH_AUTH_SUCCESS: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...action.data
                }
            }
        }

        case Type.FETCH_AUTH_FAILED: {
            return {
                ...state,
                error: {
                    ...state.error,
                    ...action.error
                }
            }
        }

        default:
            return state;
    }
};

export const getAuth = (state) => state.root.auth;

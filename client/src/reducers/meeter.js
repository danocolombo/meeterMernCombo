import {
    SET_CLIENT_USERS,
    CLEAR_CLIENT_USERS,
    SET_DEFAULT_GROUPS,
    ADMIN_ERROR,
} from '../actions/types';

const initialState = {
    clientUsers: [],
    defaultGroups: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CLIENT_USERS:
            return {
                ...state,
                clientUsers: payload,
                loading: false,
            };
        case CLEAR_CLIENT_USERS:
        case ADMIN_ERROR:
            return {
                ...state,
                clientUsers: [],
                defaultGroups: [],
                error: payload,
                loading: false,
            };
        case SET_DEFAULT_GROUPS:
            return {
                ...state,
                defaultGroups: payload,
                loading: false,
            };
        // case CLEAR_DEFAULT_GROUPS:
        //     return {
        //         ...state,
        //         defaultGroups: [],
        //         error: payload,
        //         loading: false,
        //     };
        default:
            return state;
    }
}

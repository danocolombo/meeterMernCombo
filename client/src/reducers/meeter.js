import {
    SET_CLIENT_USERS,
    CLEAR_CLIENT_USERS,
    SET_DEFAULT_GROUPS,
    REMOVE_CLIENT_USER,
    ADMIN_ERROR,
} from '../actions/types';

const initialState = {
    clientUsers: [],
    clientUser: null,
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
        case REMOVE_CLIENT_USER:
            return {
                ...state,
                clientUsers: state.clientUsers.filter(
                    (clientUser) => clientUser._id !== payload
                ),
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

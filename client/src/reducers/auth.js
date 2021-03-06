import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
    SET_USER_AUTH,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            // const { _id, name, defaultClient } = payload;
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case SET_USER_AUTH:
            const { activeClient, activeRole, activeStatus } = payload;
            return {
                ...state,
                activeClient: activeClient,
                activeRole: activeRole,
                activeStatus: activeStatus,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                activeClient: null,
                activeRole: null,
                activeStatus: null,
                groups: null,
                loading: false,
            };
        default:
            return state;
    }
}

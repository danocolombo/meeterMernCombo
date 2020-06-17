import {
    ADD_GROUP,
    GET_GROUPS,
    GROUP_ERROR,
    CLEAR_GROUPS,
    CLEAR_GROUP,
    GET_GROUP,
    DELETE_GROUP,
} from '../actions/types';

const initialState = {
    groups: [],
    group: null,
    // loading: true,
    groupLoading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_GROUP:
            return {
                ...state,
                groups: [payload, ...state.groups],
                groupLoading: false,
            };
        case GROUP_ERROR:
            return {
                ...state,
                error: payload,
                groupLoading: false,
            };
        case GET_GROUPS:
            return {
                ...state,
                groups: payload,
                groupLoading: false,
            };
        case CLEAR_GROUPS:
            return {
                ...state,
                groups: null,
                groupLoading: false,
            };
        case CLEAR_GROUP:
            return {
                ...state,
                group: null,
                groupLoading: false,
            };
        case GET_GROUP:
            return {
                ...state,
                group: payload,
                groupLoading: false,
            };
        case DELETE_GROUP:
            return {
                ...state,
                groups: state.groups.filter((group) => group.id !== payload),
                groupLoading: false,
            };
        default:
            return false;
    }
}

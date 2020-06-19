import {
    CLEAR_HUMANS,
    CLEAR_HUMAN,
    SET_HUMANS,
    SET_HUMAN,
    GET_HUMANS,
    HUMAN_ERROR,
    GET_HUMAN,
    DELETE_HUMAN,
} from '../actions/types';

const initialState = {
    humans: [],
    human: null,
    humanLoading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_HUMANS:
            return {
                ...state,
                humans: payload,
                humanLoading: false,
            };
        case SET_HUMAN:
            return {
                ...state,
                human: payload,
                humanLoading: false,
            };

        //================================
        // CLEAN UP ^^^^^^^^^^^^^^^^
        //================================
        case GET_HUMANS:
            return {
                ...state,
                humans: payload,
                humanLoading: false,
            };
        case GET_HUMAN:
            return {
                ...state,
                human: payload,
                humanLoading: false,
            };
        case CLEAR_HUMANS:
            return {
                ...state,
                humans: [],
                humanLoading: false,
            };
        case CLEAR_HUMAN:
            return {
                ...state,
                human: null,
                humanLoading: false,
            };
        case DELETE_HUMAN:
            return {
                ...state,
                humans: state.humans.filter((human) => human._id !== payload),
            };
        case HUMAN_ERROR:
            return {
                ...state,
                error: payload,
                humanLoading: false,
            };
        default:
            return state;
    }
}

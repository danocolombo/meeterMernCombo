import {
    GET_HUMANS,
    HUMAN_ERROR,
    CLEAR_HUMAN,
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

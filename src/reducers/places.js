import * as types from '../constants/ActionTypes';

export default function todos(state = {
    places: []
}, action) {
    switch (action.type) {
        case types.CREATE_PLACE:
            return {
                ...state,
                places: [...state.places, action.data]
            };

        case types.CLEAR_ALL_PLACES:
            return {
                ...state,
                places: []
            };

        default:
            return state;
    }
}

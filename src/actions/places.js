import * as types from '../constants/ActionTypes';

export const createPlace = (data) => ({
    type: types.CREATE_PLACE,
    data
});

export const clearAllPlaces = () => ({
    type: types.CLEAR_ALL_PLACES
});

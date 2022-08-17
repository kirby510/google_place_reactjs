//import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "../reducers";
import promiseMiddleware from "redux-promise";
import * as types from '../constants/ActionTypes';

export default () => {
    // Deprecated
    //const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [types.CREATE_PLACE],
            }
        }).concat(promiseMiddleware),
    });

    return store;
};
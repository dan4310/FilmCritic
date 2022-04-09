import usersReducer from './user/userSlice';
import validationReducer from "./validation/validationSlice";
import { configureStore } from "@reduxjs/toolkit";
import { filmCriticApi } from '../services/filmCritic';

const reducer = {
    validation: validationReducer,
    users: usersReducer,
    [filmCriticApi.reducerPath]: filmCriticApi.reducer, 
}

export function createAction(type, payload) {
  return {type, payload};
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filmCriticApi.middleware)
});
export default store;
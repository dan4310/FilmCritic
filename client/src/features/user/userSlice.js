import { createSlice } from '@reduxjs/toolkit';
import { filmCriticApi } from '../../services/filmCritic';

const initialState = {
    loggedOnUser: {},
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser: (state, action) => {
            var temp = {...state};
            temp.loggedOnUser = action.payload;
            return state = temp;
        },
    }
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
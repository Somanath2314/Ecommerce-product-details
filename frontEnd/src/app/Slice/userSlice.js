import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    email: undefined, 
}

export const userSlice = createSlice({
    name: 'emailAuth',
    initialState,
    reducers: {
        addEmail: (state, action)=>{
            state.isAuthenticated = true;
            state.email = action.payload.email;
        },
        removeEmail: (state, action)=>{
            state.isAuthenticated = false;
            state.email=undefined;
        }
    }
}); 


export const {addEmail, removeEmail} = userSlice.actions;
export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../shared/interfaces/auth.interface";

const initialState:IAuth = {
    isAuthenticated:false,
    token:null,
    error:null,
    status:'idle',
    user:null
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
      changeAuth(state){
        state.isAuthenticated = true;
        // state.isAuthenticated = !state.isAuthenticated;
        // console.log(state);
      }
    },
    // extraReducers:{

    // }
});

export const {changeAuth} = authSlice.actions;
export default authSlice.reducer;



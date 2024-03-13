import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { IAuth } from "../../shared/interfaces/auth.interface";

const initialState:IAuth = {
    isAuthenticated:false,
    token:null,
    error:null,
    status:'idle',
    user:null
}

export const login = createAsyncThunk('auth/login', async (payload:{userId:string, password:string}) => {
    const response = await fetch('http://localhost:9000/api/v1/login', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
    });
    const data = await response.json();
    return data;
})


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
    extraReducers:(builder)=>{
        builder.addCase(login.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = 'succeed';
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            // state.error = action.error as string;
            console.log(action);
        });
    }
});
 
export const {changeAuth} = authSlice.actions;
export default authSlice.reducer;



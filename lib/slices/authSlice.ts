import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { IAuth } from "../../shared/interfaces/auth.interface";
import { BACKEND_BASE_URL,BACKEND_ORIGIN } from "../../config/api";

const initialState:IAuth = {
    isAuthenticated:false,
    token:null,
    error:null,
    status:'idle',
    user:null
}

export const login = createAsyncThunk('auth/login', async (payload:{userId:string,password:string}, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
  
      // Check if the response status code indicates an error or if your application sends a specific error flag in the JSON.
      // Adjust the condition based on your API's specification.
      if (!response.ok) {
        // Use `rejectWithValue` to send a custom error payload to your reducer
        return rejectWithValue(data);
      }
  
      return data;
    } catch (error) {
      // For network errors or parsing errors, you may want to handle them differently
      // `error` might not be in JSON format, so you might want to construct a meaningful error object
      console.error('Error during API call', error);
      return rejectWithValue({
        message: 'Network or parsing error',
        // You can include more details depending on what you want to show to the user or for logging purposes
      });
    }
  });


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
            console.log(state)
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = 'succeed';
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
            console.log(state)
        });
        builder.addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            console.log(action.payload);
            console.log(state)
           
        });
    }
});
 
export const {changeAuth} = authSlice.actions;
export default authSlice.reducer;



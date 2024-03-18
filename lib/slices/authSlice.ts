import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { IAuth } from "../../shared/interfaces/auth.interface";
import { BACKEND_BASE_URL,BACKEND_ORIGIN, LOCAL_BASE_URL } from "../../config/api";
import * as SecureStore from 'expo-secure-store';

export async function saveItem(key:string,value:string){
  await SecureStore.setItemAsync(key, value);

}

export async function getItem(key:string){
  const item = await SecureStore.getItemAsync(key);
  return item;
}

export async function deleteItem(key:string){
  await SecureStore.deleteItemAsync(key);
}


export const verifyToken = createAsyncThunk('auth/verifyToken', async (token:string, { rejectWithValue }) => {
  
  try{

    const response = await fetch(`${BACKEND_BASE_URL}/verify-token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
  })
  const data = await response.json();
  if (!response.ok) {
    return rejectWithValue("Invalid token");
  }
  // console.log(data);
 if(data.isAuthed === true){
   const token = await getItem('token');
    const user = await getItem('user');
    // console.log(user)
    return {
      token,
      user
   }
 }
}catch(error){
  console.log('error',error);
      // return rejectWithValue('Network or parsing error')
  }
})

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
      
      // Save the token to SecureStore
      await saveItem('token',data.token);
      await saveItem('user',JSON.stringify(data.user));
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
      },
      logout(state){
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = null;
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
            // console.log(state)
           
        });
      builder.addCase(verifyToken.pending, (state, action) => {
          state.status = 'loading';
          // console.log(state)
      });
      builder.addCase(verifyToken.fulfilled, (state, action) => {
          state.status = 'succeed';
          state.isAuthenticated = true;
          state.error = null;
          // console.log(action.payload);
          if(action.payload){
            state.token = action.payload.token;
            state.user = action.payload.user ? JSON.parse(action.payload.user) : null;
          }
          // state.user = action.payload.user;
          // console.log(action.payload);
          console.log(state)
      });
      builder.addCase(verifyToken.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
          console.log(action.payload);
          // console.log(state)
          state.isAuthenticated = false;
          state.token = null;
          
      });
    }
});
 
export const {changeAuth,logout} = authSlice.actions;
export default authSlice.reducer;



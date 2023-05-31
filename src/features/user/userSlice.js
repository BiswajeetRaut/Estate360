import { createSlice } from "@reduxjs/toolkit";
var user=null;
try
{
    var x=JSON.parse(window.localStorage.getItem('user'));
    if(x)
    {
      user = x;
    }
}catch(e){
    console.log(e);
}
const initialState = {
  user: user,
  otpVerify: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      localStorage.setItem('user',JSON.stringify(action.payload.user));
      state.user = action.payload.user;
    },

    setSignOutState: (state) => {
      localStorage.setItem('user',"");
      state.user = null;
    },

    setOtpVerify: (state,action)=> {
      state.otpVerify = action.payload.number;
    }
  },
});

export const { setUserLoginDetails, setSignOutState, setOtpVerify} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectOtpVerify = (state) => state.user.otpVerify;

export default userSlice.reducer;
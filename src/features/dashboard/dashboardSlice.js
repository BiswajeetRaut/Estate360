import { createSlice } from "@reduxjs/toolkit";
var dsh=1;
try
{
    var x=JSON.parse(window.localStorage.getItem('dsh'));
    if(x)
    {
      dsh = x;
    }
}catch(e){
    console.log(e);
}
const initialState = {
  dashboardOption:dsh,
};

const DashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashBoardOption: (state, action) => {
      localStorage.setItem('dsh',JSON.stringify(action.payload.dsh));
      state.dashboardOption = action.payload.dsh;
    },
  },
});

export const {setDashBoardOption} = DashBoardSlice.actions;

export const selectdashBoardOption = (state) => state.dashboard.dashboardOption;

export default DashBoardSlice.reducer;
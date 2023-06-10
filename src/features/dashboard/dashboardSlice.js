import { createSlice } from "@reduxjs/toolkit";
var dsh=1;
var search = {};
try
{
    var x=JSON.parse(window.localStorage.getItem('dsh'));
    var y = JSON.parse(window.localStorage.getItem('search'));
    if(x)
    {
      dsh = x;
    }
    if(y)
    {
      search = y;
    }
}catch(e){
    console.log(e);
}
const initialState = {
  dashboardOption:dsh,
  search:search,
  map:[],
};

const DashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashBoardOption: (state, action) => {
      localStorage.setItem('dsh',JSON.stringify(action.payload.dsh));
      state.dashboardOption = action.payload.dsh;
    },
    setSearchValues: (state, action)=>{
      localStorage.setItem('search',JSON.stringify(action.payload.search));
      state.search = action.payload.search;
    },
    setMapValues: (state, action)=>{
      state.map = action.payload.map;
    }
  },
});

export const {setDashBoardOption, setSearchValues,setMapValues} = DashBoardSlice.actions;

export const selectdashBoardOption = (state) => state.dashboard.dashboardOption;

export const selectSearchValues = (state)=> state.dashboard.search;

export const selectMapValues = (state) => state.dashboard.map;

export default DashBoardSlice.reducer;
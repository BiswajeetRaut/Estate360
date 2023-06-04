import React from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { selectdashBoardOption } from '../features/dashboard/dashboardSlice'
import AccountDetails from './AccountDetails'
import MyProperties from './MyProperties.jsx'
import MyWishList from './MyWishList'
import SellLand from './SellLand'
import { selectUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom/dist'
const DashBoard = () => {
    const dashboardOption = useSelector(selectdashBoardOption);
    const user = useSelector(selectUser);
    const history=useNavigate();
    if(user == null)
    {
      history('/login');
    }
  return (
    <div>
      <Sidebar></Sidebar>
      {
        dashboardOption==1?<AccountDetails/>:dashboardOption==2?<MyProperties/>:dashboardOption==3?<MyWishList/>:<SellLand/>
      }
    </div>
  )
}

export default DashBoard

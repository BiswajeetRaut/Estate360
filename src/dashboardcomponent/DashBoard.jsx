import React from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { selectdashBoardOption } from '../features/dashboard/dashboardSlice'
import AccountDetails from './AccountDetails'
import MyProperties from './MyProperties.jsx'
import MyWishList from './MyWishList'
import SellLand from './SellLand'
import { selectUser } from '../features/user/userSlice'
import { useHistory } from 'react-router-dom'
const DashBoard = () => {
    const dashboardOption = useSelector(selectdashBoardOption);
    const user = useSelector(selectUser);
    const history=useHistory();
    if(user == null)
    {
      history.push('/login');
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

import React from 'react'
import './Sidebar.css';
import { Avatar, List } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import { AddIcon, , ChatIcon, ChatIconSharp, Details, Home, Person, AddShoppinCartIcon, Update } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectdashBoardOption, setDashBoardOption } from '../features/dashboard/dashboardSlice';
import { selectUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const dashboardOption = useSelector(selectdashBoardOption);
  const history = useNavigate();
  console.log(dashboardOption);
  const dispatch = useDispatch();
  const sidebarToggle = () => {
    console.log(document.getElementById("sidebar").classList.toggle("close"));
  };
  var vals = ['1', '2', '3'];
  const dashboardchange = (i) => {
    dispatch(setDashBoardOption({
      dsh: i,
    }))
  }
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  return (
    <nav className="sidebar close" id="sidebar">
      <header>
        <div className="image-text" style={{ gap: `20px` }}>
          <div className="text user-img" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start"

          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              strokeWidth="2"
              strokeLinecap="butt"
              strokeLinejoin="bevel"
            >
              <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
              <circle cx="12" cy="10" r="3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <div className="text logo-text">
            <span className="name" style={{ color: "black" }}>
            </span>
            <span className="email">{user?.name}</span>
          </div>
        </div>
        <div
          className="bx bx-chevron-right toggle"
          id="toggler"
          onClick={sidebarToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="white"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <li
            className="search-box"
            onClick={() => {
              dashboardchange(1);
            }}
          >
            <PersonIcon
              className="w-8 h-8"
              style={{ height: "20px", width: "20px", color: "gray" }}
              id="addChatIcon"
            >
            </PersonIcon>
            <div className="text">Account Details</div>
          </li>
          <li
            className="search-box"
            onClick={() => {
              dashboardchange(2);
            }}
          >
            <HomeIcon
              className="w-8 h-8"
              style={{ height: "20px", width: "20px", color: "gray" }}
              id="addChatIcon"
            >
            </HomeIcon>
            <div className="text">My Properties</div>
          </li>
          <li
            className="search-box"
            onClick={() => {
              dashboardchange(3);
            }}
          >
            <AddShoppingCartIcon
              className="w-8 h-8"
              style={{ height: "20px", width: "20px", color: "gray" }}
              id="addChatIcon"
            >
            </AddShoppingCartIcon>
            <div className="text">WishList</div>
          </li>
          <li
            className="search-box"
            onClick={() => {
              dashboardchange(4);
            }}
          >
            <AddIcon
              className="w-8 h-8"
              style={{ height: "20px", width: "20px", color: "gray" }}
              id="addChatIcon"
            >
            </AddIcon>
            <div className="text">Sell A Land</div>
          </li>
          <li
            className="search-box"
            onClick={() => {
              navigate('/chats/0')
            }}
          >
            <ChatIcon
              className="w-8 h-8"
              style={{ height: "20px", width: "20px", color: "gray" }}
              id="addChatIcon"
            >
            </ChatIcon>
            <div className="text">Go to My Chats</div>
          </li>
          <li
            className="search-box"
            onClick={() => {
              navigate('/')
            }}
          >
            <ArrowBackIosIcon
              className="w-8 h-8"
              style={{ height: "20px", width: "20px", color: "gray" }}
              id="addChat"
            >
            </ArrowBackIosIcon>
            <div className="text" onClick={()=>{
              history('/');
            }}>Go to Buyer's Page</div>
          </li>

        </div>

      </div>
    </nav>
  )
}

export default Sidebar

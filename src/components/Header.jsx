import React, { useState } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import './header.css'
import dp from '../screens/chats/user.png'
import { useNavigate } from 'react-router-dom'
import { selectUser, setSignOutState } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
const Header = () => {
    const user = useSelector(selectUser);
    // console.log(user);
    const dispatch = useDispatch();
    const [optionOpen,seoptionOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <div className='header'>
            <div className="left"><a onClick={() => navigate('/')}><strong>Estate360</strong></a> </div>
            <div className="mid">
                <button onClick={() => navigate('/listing')}>BUY</button>
                <button onClick={() => navigate('/sell')}>SELL</button>
                <button onClick={() => navigate('/chats/0')}>CHATS</button>
            </div>
            <div className="right">
                <button onClick={()=>seoptionOpen(!optionOpen)}>
                    <div className="logo__img">{user.name == undefined ?"U":user.name[0]}</div>
                </button>
                {optionOpen && <Box sx={{
                    // width: '56px',
                    bgcolor: '#fff',
                    position: 'absolute',
                    right: '10%',
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
                    borderRadius: '4px',
                    zIndex:'50',
                    overflow: 'hidden',
                    display:`flex`,
                    alignItems:`center`,
                    justifyContent: `flex-start`,

                }}>
                    <nav aria-label="main mailbox folders">
                        <List>
                            <ListItem disablePadding onClick={()=>{navigate('/dashboard')
                        seoptionOpen(!optionOpen)
                        }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon sx={{ color: '#151111' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard"></ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=> {
                                    dispatch(setSignOutState());
                                    navigate('/login');
                }}>
                                    <ListItemIcon>
                                        <LogoutIcon sx={{ color: '#151111' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout"></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
                }
            </div>
        </div>
    )
}

export default Header

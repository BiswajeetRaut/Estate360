import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Signin from './components/Signin';
import DashBoard from './dashboardcomponent/DashBoard';
import Home from '../src/screens/Home'
import Chat from '../src/screens/chats/Chat'
import Listing from './screens/Listing';
import ListingDetails from './screens/ListingDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import { selectUser } from './features/user/userSlice'
import SellLand from './dashboardcomponent/SellLand';
import { useSelector } from 'react-redux';
import PropertyEdit from './dashboardcomponent/PropertyEdit';
import Pano from './screens/Pano';
function App() {
  const user = useSelector(selectUser)
  return (
    <div className="App">
      <BrowserRouter>
      {/* {user && <Header/> }        */}
        <Routes>
          <Route path="/" element={user?(<Home />):<Login/>} />
          <Route path='/sell' element={<SellLand/>}/>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path='/listing' element={<Listing />} />
          <Route path='/chats/:receiverId' element={<Chat />} />
          <Route path='/listDetails/:id' element={<ListingDetails />} />
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
          <Route path="/:landid/view" element={<DashBoard></DashBoard>}></Route>
          <Route path="/:landid/edit" element={<PropertyEdit></PropertyEdit>}></Route>
          <Route path="/:id/pano" element={
            <Pano></Pano>
          }></Route>
        </Routes>
       {/* {user && <Footer/>} */}
      </BrowserRouter>
    </div>
  );
}

export default App;

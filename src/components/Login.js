/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Login.css'
import db, { auth, provider } from '../firebase'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {selectUser,setUserLoginDetails} from '../features/user/userSlice.js';
const Login = () => {
  const history= useHistory();
  const dispatch = useDispatch();
    function signup()
    {
      history.push('/signup');
    }
    function check()
    {
      var reg= document.getElementsByClassName('reg')[0].value;
      var pass= document.getElementsByClassName('pass')[0].value;
      var count=1;
      if(reg.length!=13)
      {
        reg ='+91'+reg;
      }
      db.collection('Users').onSnapshot(snapshot=>{
        snapshot.docs.map(doc=>{
            if(reg==doc.data().phone && pass==doc.data().password)
           {
                var temp =doc.data();
                temp.id=doc.id;
                dispatch(
                  setUserLoginDetails({
                    user: temp,
                  }
                  )
                )
                history.push(`/main`);
                alert('Logged In Re-diricting you to main page');
                count=0; 
            }
        }) 
        if(count==1)
        {
          alert('Wrong Credentials');
        }
        
      });
      
    }
    function showpass()
    {
      if(document.getElementsByClassName('show')[0].value=="Show Password")
      {
        document.getElementsByClassName('show')[0].value="Hide Password"
      document.getElementsByClassName('pass')[0].type="text";
      }
      else{
        document.getElementsByClassName('show')[0].value="Show Password"
      document.getElementsByClassName('pass')[0].type="password";
      }
      
    }
  return (
  <div className="wrapper" style={{zIndex:10}}>
    <div className="title-text">
      <div className="title login">Login Form</div>
      <div className="title signup">Signup Form</div>
    </div>

    <div className="form-container">
      <div className="slide-controls">
        <input type="radio" name="slider" id="login" />
        <input type="radio" name="slider" id="signup"/>
        <label for="login" className="slide login">Login</label>
        <label for="signup" className="slide signup" onClick={signup}> Signup</label>
        <div className="slide-tab"></div>
      </div>

      <div className="form-inner">
        <form action="#" className="login">
          <div className="field">
            <input type="text" placeholder="Phone Number" className='reg'/>
          </div>
          <div className="field">
            <input type="password" placeholder="Password" className='pass'/>          
          </div>
          <div className="field">
            <input type="button" value="Show Password" className="show" onClick={showpass}/>
          </div>
          <div className="field">
            <input type="button" value="Login" onClick={check}/>
          </div>
          <div className="signup-link">
          </div>
          <div className="signup-link">
            Not a member? <a onClick={signup}>Signup now</a>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login
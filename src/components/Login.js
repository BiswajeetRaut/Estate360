/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Login.css'
import db, { auth, provider } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import {selectUser,setUserLoginDetails} from '../features/user/userSlice.js';
import { useNavigate } from 'react-router-dom/dist'
const Login = () => {
  const history= useNavigate();
  const dispatch = useDispatch();
  var index =0;
  var imgs =['https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/461960/pexels-photo-461960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/605494/pexels-photo-605494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2']
  setInterval(() => {
    try{
      console.log(document.getElementsByClassName('carousal')[0].style.backgroundImage = 'url(' +imgs[index]+')')
      index = (index+1)%4;
    }
    catch(e){

    }
  }, 4000);
    function signup()
    {
      history('/signup');
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
                history(`/`);
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
    <main>
    <div class="box">
      <div class="inner-box">
        <div class="forms-wrap">
          <form autocomplete="off" class="sign-in-form" onSubmit={(e)=>{
            e.preventDefault();
          }}>
            <div class="logo">
              <h4>Estate360</h4>
            </div>

            <div class="heading">
              <h2>Welcome Back</h2>
              <h6>Not registred yet?</h6>
              <a class="toggle" onClick={signup}>Sign up</a>
            </div>

            <div class="actual-form">
              <div class="input-wrap">
                <input
                  type="text"
                  minlength="10"
                  className="input-field reg"
                  autocomplete="off"
                  placeholder="Phone-Number"
                  required
                />
              </div>

              <div class="input-wrap">
                <input
                  type="password"
                  className="input-field pass"
                  autocomplete="off"
                  required
                  placeholder="Password"
                />
              </div>
              <input type="submit" value="Show Password" class="sign-btn show" onClick={showpass}/>
              <input type="submit" value="Log In" class="sign-btn" onClick={check}/>
            </div>
          </form>
        </div>

        <div className="carousal">
          <div className="images-wrapper">
          </div>

          <div class="text-slider">
            <div class="text-wrap">
              <div class="text-group">
                <h2>Estate360</h2>
                <p>Elevate Your Real Estate Experience with Estate 360: Discover, Connect, and Transform the Way You Engage with Properties.</p>
              </div>
            </div>
          </div>
            
        </div>
      </div>
    </div>
  </main>
  )
}

export default Login

// <div className="wrapper" style={{zIndex:10}}>
  //   <div className="title-text">
  //     <div className="title login">Login Form</div>
  //     <div className="title signup">Signup Form</div>
  //   </div>

  //   <div className="form-container">
  //     <div className="slide-controls">
  //       <input type="radio" name="slider" id="login" />
  //       <input type="radio" name="slider" id="signup"/>
  //       <label for="login" className="slide login">Login</label>
  //       <label for="signup" className="slide signup" onClick={signup}> Signup</label>
  //       <div className="slide-tab"></div>
  //     </div>

  //     <div className="form-inner">
  //       <form action="#" className="login">
  //         <div className="field">
  //           <input type="text" placeholder="Phone Number" className='reg'/>
  //         </div>
  //         <div className="field">
  //           <input type="password" placeholder="Password" className='pass'/>          
  //         </div>
  //         <div className="field">
  //           <input type="button" value="Show Password" className="show" onClick={showpass}/>
  //         </div>
  //         <div className="field">
  //           <input type="button" value="Login" onClick={check}/>
  //         </div>
  //         <div className="signup-link">
  //         </div>
  //         <div className="signup-link">
  //           Not a member? <a onClick={signup}>Signup now</a>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // </div>
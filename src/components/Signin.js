import React, { useEffect, useState } from 'react'
import db from '../firebase';
import { selectOtpVerify } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
const Signin = () => {
  const history= useNavigate();
  const otpVerify = useSelector(selectOtpVerify);
  const [phone, setphone] = useState(otpVerify);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confpass, setconfpass] = useState('');
  const [name, setname] = useState('');
  const [address, setaddress] = useState('');
  useEffect(() => {
    if(otpVerify){
      console.log('Verified',otpVerify);
    }
    else{
      history('/signup');
    }
  }, []);
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
      if(name.trim().length!=0 && password.trim().length!=0 && email.trim().length!=0 && address.trim().length!=0)
      {
        db.collection('Users').add({
          name: name,
          phone: phone,
          password: password,
          address: address,
          email: email,
        }).then(()=>{
          alert('Successfully Signed up. Redirecting you to Login Page please login with your credentials there.');
          history('/login');
        }).catch(()=>{
          alert('OOPS! Something went wrong. Please try again');
        })
      }
      else{
        alert('Please fill all the fields below');
      }
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
    <div className="box">
    <div className="inner-box">
      <div className="forms-wrap">
      <form autocomplete="off" class="sign-in-form" onSubmit={(e)=>{
        e.preventDefault();
      }}>
            <div class="logo">
              <h4>User Details</h4>
            </div>
       <div className="actual-form">
          <div className="input-wrap">
            <input 
            type="text" 
            placeholder="Phone Number"
             className='phone input-field' 
             value={otpVerify}
             />
          </div>
          <div className="input-wrap">
            <input type="text" placeholder="Full Name" className='name input-field' onChange={(e)=>{
              setname(e.target.value);
            }}
            />
          </div>
          <div className="input-wrap">
            <input type="email" placeholder="E-mail" className='email input-field'
              onChange={(e)=>{
              setemail(e.target.value);
            }}
            />
          </div>
          <div className="input-wrap">
            <input type="address" placeholder="Address" className='address input-field'
              onChange={(e)=>{
              setaddress(e.target.value);
            }}
            />          
          </div>
          <div className="input-wrap">
            <input type="password" placeholder="Password" className='pass input-field'
              onChange={(e)=>{
              setpassword(e.target.value);
            }}
            />          
          </div>
          <div className="input-wrap">
            <input type="password" placeholder="Confirm Password" className='confpass input-field'
              onChange={(e)=>{
              setconfpass(e.target.value);
            }}
            />          
          </div>
          <input type="submit" value="Show Password" class="sign-btn show" onClick={showpass}/>
              <input type="submit" value="Log In" class="sign-btn" onClick={check}/>
          </div>
        </form>
        </div>
      <div className="carousel">
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

export default Signin
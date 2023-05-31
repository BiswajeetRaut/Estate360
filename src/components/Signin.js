import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import db from '../firebase';
import { selectOtpVerify } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const Signin = () => {
  const history= useHistory();
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
      history.push('/signup');
    }
  }, [])
    function signup()
    {
      history.push('/signup');
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
          history.push('/login');
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
    <div className="wrapper" style={{zIndex:10}}>
    <div className="title-text">
      <div className="title login">User Details</div>
    </div>
    <div className="form-container">
      <div className="form-inner">
        <form action="#" className="login">
          <div className="field">
            <input type="text" placeholder="Phone Number" className='phone' value={otpVerify}/>
          </div>
          <div className="field">
            <input type="text" placeholder="Full Name" className='name' onChange={(e)=>{
              setname(e.target.value);
            }}
            />
          </div>
          <div className="field">
            <input type="email" placeholder="E-mail" className='email'
              onChange={(e)=>{
              setemail(e.target.value);
            }}
            />
          </div>
          <div className="field">
            <input type="address" placeholder="Address" className='address'
              onChange={(e)=>{
              setaddress(e.target.value);
            }}
            />          
          </div>
          <div className="field">
            <input type="password" placeholder="Password" className='pass'
              onChange={(e)=>{
              setpassword(e.target.value);
            }}
            />          
          </div>
          <div className="field">
            <input type="password" placeholder="Confirm Password" className='confpass'
              onChange={(e)=>{
              setconfpass(e.target.value);
            }}
            />          
          </div>
          <div className="field">
            <input type="button" value="Show Password" className="show" onClick={showpass}/>
          </div>
          <div className="field">
            <input type="button" value="Login" onClick={check}/>
          </div>
          <div className="signup-link">
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Signin
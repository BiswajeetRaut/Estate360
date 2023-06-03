import React, { useState } from 'react'
import './Signup.css'
import db, { auth, provider } from '../firebase'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core';
import { setOtpVerify } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
const Signup = () => {
  const [phone, setPhone] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
      size: 'visible',
      callback: (response) => {
      }
    });
  }
  const handleSend = (event) => {
    event.preventDefault();
    db.collection('Users')
  .where('phone', '==', phone)
  .get()
  .then((querySnapshot) => {
    if(querySnapshot.size ==0)
    {
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        console.log(error);
      });
    }
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      alert('Duplicate');
      setHasFilled(false);
    });
  })
  .catch((error) => {
    console.log('Error getting documents: ', error);
  });
  }

  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      // verify otp
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp)
        .then((result) => {
          // User signed in successfully.
          let user = result.user;
          console.log(user);
          dispatch(setOtpVerify(
            {
              number:phone,
            }
          ))
          alert('User signed in successfully');
          history.push('/signin');
          // ...
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert("User couldn't sign in (bad verification code?)");
        });
    }
  }

  if (!hasFilled) {
    return (
      <div className='app__container'>
        <Card sx={{ width: '300px' }} style={{
          padding:'10px',
        }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography sx={{ padding: '20px' }} variant='h5' component='div'>Enter your phone number</Typography>
            <form onSubmit={handleSend} style={{
              display:'flex',
              gap:'10px',
              flexDirection:'column',
            }}>
              <TextField sx={{ width: '240px' }} variant='outlined' autoComplete='off' label='Phone Number' value={phone} onChange={(event) => setPhone(event.target.value)} />
              <Button type='submit' variant='contained' sx={{ width: '240px', marginTop: '20px' }}>Send Code</Button>
            </form>
          </CardContent>
        </Card>
        <div id="recaptcha"></div>
      </div>
    )
  } else {
    return (
      <div className='app__container'>
        <Card sx={{ width: '300px' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography sx={{ padding: '20px' }} variant='h5' component='div'>Enter the OTP</Typography>
            <TextField sx={{ width: '240px' }} variant='outlined' label='OTP ' value={otp} onChange={verifyOtp} />
          </CardContent>
        </Card>
        <div id="recaptcha"></div>
      </div>
    )
  }
}

export default Signup;

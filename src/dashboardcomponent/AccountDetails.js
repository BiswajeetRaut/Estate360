import React, { useState } from 'react'
import'./AccountDetails.css'
import { selectUser, setUserLoginDetails } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import db from '../firebase';
const AccountDetails = () => {
  const user = useSelector(selectUser);
  console.log(user);
  const [pass, setpass] = useState(user.password);
  const [address,setaddress] = useState(user.address);
  const [email,setemail] = useState(user.email);
  const [name,setname] = useState(user.name);
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
  const updateDetails = ()=>
  {
    db.collection('Users').doc(user.id).update({
        phone:user.phone,
        password:pass,
        address:address,
        email:email,
        name:name,
    }).then(()=>{
        dispatch(setUserLoginDetails({
            user:{
        phone:user.phone,
        password:pass,
        address:address,
        email:email,
        name:name,
        id:user.id,
            }
        }))
        alert('Updated Your details');
    })
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
          <div className="heading">
            <h2>{user?.name}</h2>
            <h6>The below are your details. You can change them and click the Update Details button to change the details.</h6>
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
                  value={user.phone}
                />
                
              </div>
              <div class="input-wrap">
                <input
                  type="text"
                  className="input-field pass"
                  autocomplete="off"
                  required
                  placeholder="text"
                  value={pass}
                  onChange={(e)=>{
                    setpass(e.target.value);
                  }}
                />
              </div>
              <div class="input-wrap">
                <input
                  type="text"
                  className="input-field pass"
                  autocomplete="off"
                  required
                  placeholder="Name"
                  value={name}
                  onChange={(e)=>{
                    setname(e.target.value);
                  }}
                />
              </div>
              <div class="input-wrap">
                <input
                  type="text"
                  className="input-field pass"
                  autocomplete="off"
                  required
                  placeholder="E-mal"
                  value={email}
                  onChange={(e)=>{
                    setemail(e.target.value);
                  }}
                />
              </div>
              <div class="input-wrap">
                <input
                  type="text"
                  className="input-field pass"
                  autocomplete="off"
                  required
                  placeholder="Address"
                  value={address}
                  onChange={(e)=>{
                    setaddress(e.target.value);
                  }}
                />
              </div>
              <input type="submit" value="Show Password" class="sign-btn show" onClick={showpass}/>
              <input type="submit" value="Update Details" class="sign-btn" onClick={updateDetails}/>
            </div>
          </form>
        </div>
        <div className="carousal details_carousel" style={{backgroundColor:`white !important`,}}>
          <div className="images-wrapper">
          </div>

          {/* <div class="text-slider">
            <div class="text-wrap">
              <div class="text-group">
                <h2>Estate360</h2>
                <p>Elevate Your Real Estate Experience with Estate 360: Discover, Connect, and Transform the Way You Engage with Properties.</p>
              </div>
            </div>
          </div> */}
            
        </div>
      </div>
    </div>
  </main>
  )
}

export default AccountDetails

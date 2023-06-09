import React, { useEffect, useState } from 'react'
import { PropagateLoader } from 'react-spinners'
import db, { storage } from '../firebase'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import './SellLand.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import firebase from 'firebase';
import { useNavigate, useParams } from 'react-router-dom';
const PropertyEdit = () => {
    const history = useNavigate();
    const {landid} = useParams();
    console.log(landid);
    const user = useSelector(selectUser);
    const [location, setlocation] = useState('');
    const [area,setarea] = useState('');
    const [price,setprice] = useState('');
    const [description,setdescription] = useState('');
    const [img,setimg] = useState([]);
    const[panorma,setpanorma]=useState([]);
    const[loading,setloading]=useState(false);
    const [status,setstatus] = useState("");
    var index =0;
  var imgs =['https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/461960/pexels-photo-461960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/605494/pexels-photo-605494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'];
  setInterval(() => {
    try{
      console.log(document.getElementsByClassName('carousal')[0].style.backgroundImage = 'url(' +imgs[index]+')')
      index = (index+1)%4;
    }
    catch(e){

    }
  }, 4000);
   useEffect(()=>{
    db.collection('Lands').doc(landid).get().then((querySnapshot)=>{
        console.log(querySnapshot.data());
        setarea(querySnapshot.data().area);
        setlocation(querySnapshot.data().location);
        setprice(querySnapshot.data().price);
        setimg(querySnapshot.data().images);
        setstatus(querySnapshot.data().status);
        setdescription(querySnapshot.data().description);
        setpanorma(querySnapshot.data().panorma)
}).catch((error)=>{console.log(error);})
   },[])
  return (
    <main style={{
        width: `100%`,
    minHeight: `100vh`,
    overflow: `hidden`,
    /* background-color: #ff8c6b, */
    backgroundColor: `#88c6f7 !important`,
    padding: `2rem`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
    gap: `10px`,
    }}>
    {loading==true?(<div className="loading"><PropagateLoader color='white'>
    </PropagateLoader>
    Please wait for a while. We are storing your data.....
    </div>):(
        <div class="box">
      <div class="inner-box">
        <div class="forms-wrap">
          <form autocomplete="off" class="sign-in-form" onSubmit={(e)=>{
            e.preventDefault();
          }}>
          <div className="heading">
            <h2 style={{fontSize:`1.8rem`}}>Update Land Details</h2>
            <h6>Update the details of the land here...</h6>
          </div>
            <div class="actual-form">
              <div class="input-wrap" style={{position: `relative`,
                        height: `37px`,
                        marginBottom: `2rem`,
                        display: `flex`,
                        justifyContent: `flex-end`,
                        alignItems: `center`,}}>
                <input
                  type="text"
                  
                  className="input-field reg"
                  autocomplete="off"
                  placeholder="Location"
                  required
                  value={location}
                  onChange={(e)=>{
                    setlocation(e.target.value);
                  }}
                />
                <MyLocationIcon></MyLocationIcon>
              </div>
              <div class="input-wrap">
                <input
                  type="text"
                  
                  className="input-field reg"
                  autocomplete="off"
                  placeholder="Area (in Sq.Ft)"
                  required
                  value={area}
                  onChange={(e)=>{
                    setarea(e.target.value);
                  }}
                />
              </div>
              <div class="input-wrap">
                <input
                  type="text"
                  
                  className="input-field reg"
                  autocomplete="off"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e)=>{
                    setprice(e.target.value);
                  }}
                />
              </div>
              <div class="input-wrap">
                <input
                  type="text"
                  
                  className="input-field reg"
                  autocomplete="off"
                  placeholder="Status"
                  required
                  value={status}
                  onChange={(e)=>{
                    setstatus(e.target.value);
                  }}
                />
              </div>
              <div class="input-wrap">
              <textarea
                className="input-field"
                placeholder='Description'
                value={description}
                  onChange={(e)=>{
                    setdescription(e.target.value);
                  }}
              ></textarea>
              </div>
              <div className="uploads">
              <div className="upload">
              <div>{"("+img.length+" Images uploaded)"}</div>
              <input type="file" placeholder="Upload Image" className='img-upload' onChange={(e)=>{
                //   handleImageUpload(e);
              }} multiple/>
              </div>
              <div className="upload">
              <div> {"("+panorma.length+" panorma image uploaded)"}</div>
              <input type="file" placeholder="Upload Panorma Image" className='img-upload'
                onChange={(e)=>{
                //   handlePanormaUpload(e);
                }}
              />
              </div>
              <input type="submit" value="Update Listing" class="sign-btn" 
              onClick={()=>{
                setloading(true);
                db.collection('Lands').doc(landid).update({
                    location:location,
                    area:area,
                    images:img,
                    panorma:panorma,
                    price:price,
                    description:description,
                })
                .then(()=>{
                    setloading(false);
                    alert('Successfully Updated Details');
                })
                .catch(()=>{
                    alert('Something Went wrong Please try again');
                    setloading(false);
                })
                }}
              />
              </div>
            </div>
          </form>
        </div>
        <div className="carousal details_carousel" style={{backgroundColor:`white !important`,}}>
          <div className="images-wrapper">
          </div>
        </div>
      </div>
    </div>)}
    <div className="sign-btn" style={{
        maxWidth: `200px`,
    textAlign: `center`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    padding: `10px`,
    }}
    onClick={()=>{
        history('/dashboard');
    }}
    >Go to dashboard</div>
  </main>
  )
}

export default PropertyEdit

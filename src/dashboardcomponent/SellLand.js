import React, { useEffect, useState } from 'react'
import db, { storage } from '../firebase'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import './SellLand.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import { PropagateLoader } from 'react-spinners';
import firebase from 'firebase';
import Map from '../components/Map';
import { selectMapValues } from '../features/dashboard/dashboardSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SellLand = () => {
  const map = useSelector(selectMapValues);
  const user = useSelector(selectUser);
  const [location, setlocation] = useState('');
  const [area,setarea] = useState('');
  const [price,setprice] = useState(0);
  const [description,setdescription] = useState('');
  const [img,setimg] = useState([]);
  const[panorma,setpanorma]=useState([]);
  const[loading,setloading]=useState(false);
  const [city,setcity] = useState('');
  const [lat,setlat] = useState(map.length==0?'':map[0]);
  const [lng,setlng] = useState(map.length==0?'':map[1]);
  const history = useNavigate();
  useEffect(() => {
  setlat(map.length==0?-1:map[0]);
  setlng(map.length==0?-1:map[1]);
  }, [map,])
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if(files==undefined || files==null) return;
    const imageFileTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'svg', 'webp'];
    var flag=0;
    files.forEach((file)=>{
      if(imageFileTypes.indexOf(file.name.split('.')[file.name.split('.').length-1])==-1)
      {
        flag++;
      }
      console.log(file.name.split('.')[file.name.split('.').length-1])
    })
    if(flag==0)
    {
      setimg(files);
      return;
    }
    alert('Some files are not image files. Please upload all Image files.');
    setimg([]);
    console.log(files);
  };
  const handlePanormaUpload = (e)=>{
    const file = e.target.files[0];
    if(file==undefined || file==null) return;
    const imageFileTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'svg', 'webp'];
    if(imageFileTypes.indexOf(file.name.split('.')[file.name.split('.').length-1])==-1)
      {
        alert('Please Input an Image');
      }
      else{
        const reader = new FileReader();

    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;

      image.onload = function () {
        const width = image.width;
        const height = image.height;
        if(width/height >1.2)
        {
          // var files = Array.from()
          setpanorma([file]);
        }
        else{
          alert('Please upload a panorma image');
        }
      };
    };

    reader.readAsDataURL(file);
      }
      console.log(file.name.split('.')[file.name.split('.').length-1])
  };
  const check = () =>{
    if(location==''||area==''||price==0||description==''||panorma==[]||img==[]||city=='')
    {
        return false;
    }
    return true;
  }
  const UploadDetails = ()=>{
    if(!(location==''||area==''||price==0||description==''||panorma.length==0||img.length==0))
    {
      setloading(true);
      const imageUrls = [];
  const uploadPromises = img.map((imageFile) => {
    const fileName = `${Date.now()}_${imageFile.name}`;
    const storageRef = storage.ref(fileName);
    return storageRef.put(imageFile).then(() => {
      return storageRef.getDownloadURL().then((downloadURL) => {
        imageUrls.push(downloadURL);
      });
    });
  });

  Promise.all(uploadPromises)
    .then(() => {
      console.log(imageUrls);
      const panormaimgUrls =[];
      const uploadpanormaPromises = panorma.map((panormaimageFile) => {
        const fileNamepanorma = `${Date.now()}_${panormaimageFile.name}`;
        const storageRef = storage.ref(fileNamepanorma);
        return storageRef.put(panormaimageFile).then(() => {
          return storageRef.getDownloadURL().then((downloadURL) => {
            panormaimgUrls.push(downloadURL);
          });
        });
      });
      Promise.all(uploadpanormaPromises).then(()=>{
        console.log(panormaimgUrls);
        db.collection('Lands').add({
          location:location,
          price:price,
          area:area,
          description:description,
          images:imageUrls,
          panorma:panormaimgUrls,
          ownerid:user.id,
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
          status:"current",
          popularity:0,
          city:city,
          lat:lat,
          lng:lng,
        }).then((docRef)=>{
          console.log(docRef.id);
          alert("Uploaded Succesfully.")
          setloading(false);
          setlocation('');
          setarea('');
          setdescription('');
          setimg([]);
          setpanorma([]);
          setprice(0);
          setcity('');
        })
      }).catch((error)=>{
        alert('Error downloading images',error);
        setloading(false);
      })
    })
    .catch((error) => {
      alert('Error downloading images');
      console.log('Error uploading images:', error);
      setloading(false);
    });
    }
    else{
      alert('Fill all the fields and then submit');
    }
  }
  return (
    <main>
    <a onClick={()=>{
      history('/landtutorial');
    }}
    style={{
      position: `absolute`,
    top: `2px`,
    textDecoration: `underline`,
    cursor:`pointer`,
    cursor: `pointer`,
    zIndex: `100`,
    textShadow: `0 0 11px #0000008f`,
    }}
    >Click here to know - How to Sell a Land</a>
    {loading==true?(<div className="loading"><PropagateLoader color='white'>
    </PropagateLoader>
    Please wait for a while. We are storing your data.....
    </div>):(
      <div class="box" style={{    
    position: `relative`,
    width: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `flex-end`,
    padding: `30px`,
    backgroundColor: `#fff`,
    borderRadius: `3.3rem`,
    boxShadow: `0 60px 40px -30px rgba(0, 0, 0, 0.27)`,}}>
      <div class="inner-box">
        <div class="forms-wrap">
          <form autocomplete="off" class="sign-in-form" onSubmit={(e)=>{
            e.preventDefault();
          }}>
          <div className="heading">
            <h2>Sell A Land</h2>
            <h6>Give the information of the Land.</h6>
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
                  }
                  }
              
                />
                <MyLocationIcon onClick={()=>{
                  navigator.geolocation.getCurrentPosition(async(pos)=>{
                  console.log(pos.coords.latitude, pos.coords.longitude);
                  console.log(pos.coords.accuracy);
                  const options = {
  method: 'GET',
  url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
  params: {
    location: `${pos.coords.latitude},${pos.coords.longitude}`,
    language: 'en'
  },
  headers: {
    'X-RapidAPI-Key': '3a2c9f5e70msh4fd22237ba94150p1b8d77jsn9bed91208b46',
    'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
  var con= window.confirm('Your Current Address Detected is: '+response.data.results[0].address);
  if(con)
  {
    setlocation(response.data.results[0].address);
    setlat(pos.coords.latitude);
    setlng(pos.coords.longitude);
  }
} catch (error) {
	console.error(error);
}
                },(e)=>{
                    console.log(e);
                });
                
                }}
                style={{zIndex:`100`}}></MyLocationIcon>
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
                  type="number"
                  
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
              <div>Upload Image {"("+img.length+" uploaded)"}</div>
              <input type="file" placeholder="Upload Image" className='img-upload' onChange={(e)=>{
                  handleImageUpload(e);
              }} multiple/>
              </div>
              <div className="upload">
              <div> Upload Panorma {"("+panorma.length+" uploaded)"}</div>
              <input type="file" placeholder="Upload Panorma Image" className='img-upload'
                onChange={(e)=>{
                  handlePanormaUpload(e);
                }}
              />
              </div>
              <input type="submit" value="Add Land to Listing" class="sign-btn" onClick={UploadDetails}/>
              <input type="button" value="Set Map" class="sign-btn" onClick={
                async(e)=>{
                    const options = {
  method: 'GET',
  url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
  params: {
    address: location,
    language: 'en'
  },
  headers: {
    'X-RapidAPI-Key': '3a2c9f5e70msh4fd22237ba94150p1b8d77jsn9bed91208b46',
    'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options).then((response)=>{
    console.log(response.data);
    setlat(response.data.results[0].location.lat);
    setlng(response.data.results[0].location.lng);
    var x = window.confirm('Map Set at:'+response.data.results[0].address+'Please Navigate in the Map and pick your land'+'\n Press OK to accept this location');
    if(x){setlocation(response.data.results[0].address);}
  });
} catch (error) {
	console.error(error);
}
              }}/>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="map" style={{
    // width: `50%`,
    padding: `2px`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    flexDirection:`column`,
    gap:`10px`,}}>
        <button className="sign-btn" onClick={()=>{
          console.log('click');
        }}>Choose From Map for Accurate Location</button>
        <Map latitude={lat} longitude={lng} term={true}></Map>
      </div>
    </div>)}
  </main>
  )
}

export default SellLand

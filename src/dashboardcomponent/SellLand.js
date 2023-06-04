import React, { useState } from 'react'
import db, { storage } from '../firebase'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import './SellLand.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import { PropagateLoader } from 'react-spinners';
import firebase from 'firebase';
const SellLand = () => {
  const user = useSelector(selectUser);
  const [location, setlocation] = useState('');
  const [area,setarea] = useState('');
  const [price,setprice] = useState('');
  const [description,setdescription] = useState('');
  const [img,setimg] = useState([]);
  const[panorma,setpanorma]=useState([]);
  const[loading,setloading]=useState(false);
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
        if(width/height >2)
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
    if(location==''||area==''||price==''||description==''||panorma==[]||img==[])
    {
        return false;
    }
    return true;
  }
  const UploadDetails = ()=>{
    if(check())
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
        }).then((docRef)=>{
          console.log(docRef.id);
          alert("Uploaded Succesfully.")
          setloading(false);
          setlocation('');
          setarea('');
          setdescription('');
          setimg([]);
          setpanorma([]);
          setprice('');
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
    {loading==true?(<div className="loading"><PropagateLoader color='white'>
    </PropagateLoader>
    Please wait for a while. We are storing your data.....
    </div>):(<div class="box">
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
  </main>
  )
}

export default SellLand

/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import db from '../firebase';
import { PropagateLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom/dist';
const MyWishList = () => {
  const history = useNavigate();
  const [vals, setvals] = useState([]);
  const[lands,setlands]= useState([]);
  const [wish,setwish]= useState(0);
  const [change,setchange]=useState(false);
  const user = useSelector(selectUser);
  const [loading,setloading] = useState(true);
  console.log(vals);
  console.log(lands);
  console.log(wish);
  console.log(loading);
  var documents =[];
  useEffect(()=>{
    setlands(vals);
    console.log(lands);
  },[vals])
  useEffect(() => {
    db.collection('Users')
    .doc(user.id)
    .collection('wishlist')
    .get()
    .then((querySnapshot)=>{
      setwish(querySnapshot.size);
      querySnapshot.docs.forEach((doc1)=>{
        db.collection('Lands')
        .doc(doc1.data().landid)
        .get()
        .then((querySnapshot)=>{
          var temp = querySnapshot.data();
          temp.id = doc1.id;
          temp.landid = doc1.data().landid;
          documents.push(temp);
          console.log(documents);
          setvals(documents);
        })
        .catch((err)=>{
          console.log(err);
        })
      });
      setloading(false);
    })
    .catch(()=>{})
    }, [change,])
    var tags=['Discover the Perfect Land for Your Dreams',"Find Your Piece of Paradise","Explore, Invest, Build: Land Opportunities Await","Building Dreams on Solid Ground"];
    var index =0;
    setInterval(() => {
     try{ 
      document.getElementById('h4').innerText=tags[index];
      index= (index+1)%4}
      catch(e){
        console.log(e);
      }
    }, 4000);
  return (
    <div class="slide-container">
  <div className="heading main__heading" style={{position:`absolute`,top:`25px`, left:`30px`, right:`20px`, display:`flex`,maxHeight:`200px`,gap:`30px`}}>
  <div className="heading1" style={{alignItems:`center`}}>
  <h2>My Wishlist</h2>
  <span>You have wishlisted <h3>
  {wish}
  </h3>
  Properties</span>
  </div>
  <div className="heading2">
  <h3 id="h4"></h3>
  </div>
  </div>
  <div class="wrapper">
    {
      loading==true?(<div className="loading" style={{marginTop:`20px`}}><PropagateLoader color='white'>
    </PropagateLoader>
    Please wait for a while. We are fetching your data.....
    </div>):lands.length==0?(<div style={{display: `flex`,
    gap: `5px`,
    textAlign: `center`,
    position: `absolute`,
    right: `10px`,
    left: `30px`,
    margin: `auto`,
    justifyContent: `center`,
    alignItems: `center`,}}>
        There are no Lands in your WishList.
      </div>):(lands.map((val)=>{
      return(
        <div class="clash-card archer">
      {/* <div class="clash-card__level clash-card__level--archer">Level 5</div> */}
      <div class="clash-card__unit-name"></div>
      <div class="clash-card__unit-description">
        Location: {val.location}
        <br />
        Price: {val.price}
        <br />
        Area: {val.area}
        <br />
        Listed On: {val.timestamp.toDate().toLocaleDateString()}
        <br />
        Status: {val.status}
      </div>
      <div class="clash-card__unit-stats clash-card__unit-stats--archer clearfix">
        <div class="one-third">
          <div class="stat-value">View</div>
        </div>
        <div class="one-third">
          <div class="stat-value"
          onClick={()=>{
            if(user.id == val.ownerid)
            {
              alert('This Land is your land only so you cannot chat. Please choose a different owners land to chat with.');
              return;
            }
            var push = '/chats/'+user.id+'/'+val.ownerid;
            history(push);
          }}
          >Chat</div>
        </div>
        <div class="one-third no-border">
          <div class="stat-value" onClick={()=>{
            var x = window.confirm('Are you sure you want to Remove this from your wishlist?');
            console.log(x);
            if(x)
            {
              db.collection('Users')
              .doc(user.id)
              .collection('wishlist')
              .doc(val.id)
              .delete()
              .then(()=>{
                alert('Deleted successfully.');
                setchange(!change);
              })
              .catch((err)=>{
                console.log(err);
              })
            }
          }}>Remove</div>
        </div>
      </div>
    </div>
      )
    }))
    }
  </div> 
</div> 
  )
}

export default MyWishList

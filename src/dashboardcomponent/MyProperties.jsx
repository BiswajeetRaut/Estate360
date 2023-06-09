import React, { useEffect, useState } from 'react'
import './MyProperties.css'
import db, { auth, provider } from '../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'
import { PropagateLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom/dist'
const MyProperties = () => {
  const user = useSelector(selectUser);
  const history = useNavigate();
  const [vals, setvals] = useState([]);
  const [sold,setsold] = useState(0);
  const [current,setcurrent] = useState(0);
  const [laoding, setlaoding] = useState(true);
  const [change,setchange] = useState(false);
  console.log(vals);
  var tags=['Discover the Perfect Land for Your Dreams',"Find Your Piece of Paradise","Explore, Invest, Build: Land Opportunities Await","Building Dreams on Solid Ground"];
  var index =0;
  setInterval(() => {
   try{ document.getElementById('h3').innerText=tags[index];
    index= (index+1)%4}
    catch(e){
      console.log(e);
    }
  }, 4000);
  useEffect(() => {
    db.collection("Lands")
    .where("ownerid", "==",user.id )
    .get()
    .then((querySnapshot)=>{
      // setvals(querysnapshot.docs);
      // console.log(querysnapshot.docs);
      const documents = [];
      querySnapshot.forEach((doc) => {
        // Access individual document data
        const documentData = doc.data();
        documentData.id=doc.id;
        documents.push(documentData);
      });
      setvals(documents);
      setlaoding(false);
      db.collection('Lands')
      .where('ownerid','==',user.id)
      .where('status','==','sold')
      .get()
      .then((querySnapshot)=>{
        console.log(vals.length);
        setsold(querySnapshot.size);
        db.collection('Lands')
        .where('ownerid','==',user.id)
        .where('status','==','current')
        .get()
        .then((querySnapshot)=>{
          setcurrent(querySnapshot.size);
        })
        .catch(()=>{})
      })
      .catch(()=>{})
    })
    .catch((err)=>{
      console.log(err);
    })
    
  }, [change,])
  return (
  <div class="slide-container">
  <div className="heading main__heading" style={{position:`absolute`,top:`25px`, left:`auto`, right:`auto`, display:`flex`,maxHeight:`200px`,gap:`30px`,maxWidth:`80%`}}>
  <div className="heading1"><h2>My Properties</h2>
  <span>Total Listings: {sold+current}</span>
  <span>Sold: {sold}</span>
  <span>Current Listings: {current}</span>
  </div>
  <div className="heading2">
  <h3 id="h3"></h3>
  </div>
  </div>
  <div class="wrapper">
    {
      laoding==true?(<div className="loading" style={{marginTop:`20px`}}><PropagateLoader color='white'>
    </PropagateLoader>
    Please wait for a while. We are fetching your data.....
    </div>):(vals.length==0?(<div style={{display: `flex`,
    gap: `5px`,
    textAlign: `center`,
    position: `absolute`,
    right: `10px`,
    left: `30px`,
    margin: `auto`,
    justifyContent: `center`,
    alignItems: `center`,}}>
        You have not Listed any Land yet. Want to sell a land then list it in the 
        <a>
        Sell a Land page
        </a> 
      </div>):(vals.map((val)=>
    {return(<div class="clash-card archer">
      {/* <div class="clash-card__level clash-card__level--archer">Level 5</div> */}
      <div class="clash-card__unit-name"></div>
      <div class="clash-card__unit-description">
        Location: {val.location}
        <br />
        Price: {val.price}
        <br />
        Area: {val.area}
        <br />
        Contact Info: {user.phone}
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
          <div class="stat-value" onClick={()=>{
            var push = '/'+val.id+'/edit';
            history(push);
          }}>Edit</div>
        </div>
        <div class="one-third no-border">
          <div class="stat-value"
          onClick={()=>{
            var x = window.confirm('Are you sure you want to Delete this Listing?');
            console.log(x);
            if(x)
            {
              db.collection('Lands')
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
          }}
          >Delete</div>
        </div>
      </div>
    </div>)}
    )))

    }
  </div> 
</div> 
  )
}

export default MyProperties

import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './listingdetail.css'
import Map from '../components/Map';
import {  useNavigate, useParams } from 'react-router-dom';
import db from '../firebase';
const ListingDetails = () => {
    const [landDetails,setDetails] = useState()
    const { id } = useParams();
    const history = useNavigate();
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        db.collection("Lands")
          .doc(id)
          .get()
          .then((doc) => {
            // console.log(doc)
            if (doc.exists) {
                setDetails(doc.data());
            } else {
              console.log("no such document in firebase 🔥");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }, [id]);
      console.log(landDetails)
    var images = ['https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/461960/pexels-photo-461960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/4406329/pexels-photo-4406329.jpeg',
        'https://images.pexels.com/photos/6129525/pexels-photo-6129525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
    return (
        <div className='listing-detail'>
            <div className="corosal-cont">

                <Carousel
                    infiniteLoop={true}
                    centerMode={true}
                    centerSlidePercentage={100}
                    // dynamicHeight={false}
                    // showArrows={false}
                    // showIndicators={false}
                    autoPlay={true}
                    showThumbs={false}
                    interval={2500}
                >
                    {
                      landDetails && landDetails.images.map((ele) => {
                            return (
                                <img src={ele} alt="" className='caro-img' />
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className="details-map">
                <div className="details">
                    <span style={{ fontSize: '1.5rem', marginBottom: '5px', fontWeight: 'bold', color: '#3f3838' }}>{landDetails && landDetails.location}</span>
                    <span>{landDetails && landDetails.description}</span>
                    <span style={{ margin: '5px 0px', fontSize: '1.2rem' }}> <strong>Price : ₹{landDetails && landDetails.price}</strong></span>
                    <span style={{ margin: '5px 0px' }}> <strong>Added on : </strong> {landDetails?.timestamp.toDate().toString().slice(4,15)}</span>
                    <span style={{ fontSize: '1.1rem', marginBottom: '15px' }}> <strong>Area : </strong>{landDetails && landDetails.area} sq.ft.</span>
                    <button>Open 360° View</button>
                    <button>Add To Wishlist</button>
                    <button onClick={() => history(`/chats/${landDetails.ownerid}`)}>Messege the Owner</button>
                </div>
                <div className="map">
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default ListingDetails

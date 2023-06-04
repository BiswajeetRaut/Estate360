import React, { useState } from 'react'
import './card.css'
import { ImLocation2 } from "react-icons/im";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {  useNavigate } from 'react-router-dom';
const Card = (props) => {
  const land_det = props.land_det;
  const history = useNavigate()
  const [iswishlist, setwishList] = useState(false)
  return (
    <a  onClick={() => history(`/listDetails/${land_det.landId}`)}>
      <div className='card'>
        <div className="card-image">
        </div>
        <div className="card-details">
          <div className="adress">
            <div className='add'> <ImLocation2 /> <span>{land_det.location.slice(0,24)}...</span></div>
            {/* <a onClick={() => setwishList(!iswishlist)}>
              {
                iswishlist ? <AiFillHeart /> : <AiOutlineHeart />
              }
            </a> */}
          </div>
          <div className="desc">
            {land_det.description.slice(0,30)}...
          </div>
          <div className="price">
            ₹ {land_det.price}
          </div>
          <div className="acre">
            {land_det.area} sq.ft.
          </div>
        </div>
      </div>
    </a>
  )
}

export default Card

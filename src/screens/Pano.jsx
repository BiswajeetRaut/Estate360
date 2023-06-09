import ReactPannellum, { getConfig } from "react-pannellum";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import db from "../firebase";
import { PropagateLoader } from "react-spinners";
import { hotspotDebug } from 'react-pannellum';
import './pano.css';
import { Slider } from "@mui/material";
import Header from "../components/Header";
const Pano = () => {
    const [panorm, setpanorm] = useState([]);
    const {id}=useParams();
    const history = useNavigate();
    console.log(panorm);
    function click() {
        console.log(getConfig());
      }
      const config = {
        autoRotate: -1,
        hotspotDebug: true,
        compass:true,
        autoRotateInactivityDelay: 3000,
        prezoom: 20,
        hfov: 90, 
        maxTextureWidth: 4096,
        maxTextureHeight: 2048,
      };
      const [configur,setconfigur]=useState(config);
      useEffect(()=>{
        db.collection('Lands').doc(id).get().then((snapshot)=>{
            setpanorm(snapshot.data().panorma);
        })
    },[])
  return (
    <div className="pano">
      <p>360 Degree View</p>
     {panorm.length==0?(<PropagateLoader/>):
        (
      <div style={{
          width: `90%`,
          height:`60%`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
}}>
        <ReactPannellum
        id="1"
        sceneId="firstScene"
        imageSource={panorm[0]}
        // imageSource="https://pannellum.org/images/alma.jpg"
        config={configur}
        className="pano__img"
        style={{width:`90%`,
        height:`90%`}}
        />
        <div onClick={click}></div>
        <button className="button" onClick={()=>{
            history(`/listDetails/${id}`)
        }}>Go back</button>
      </div>
      )
      }
    </div>
  );
};

export default Pano;
    
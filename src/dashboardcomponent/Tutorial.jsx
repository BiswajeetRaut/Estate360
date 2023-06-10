import React, { useEffect, useState } from 'react'
import './Tutorial.css'
import { PropagateLoader } from 'react-spinners';
import EnglishSell from '../assets/Tutorials/EnglishSell.mp4';
import HindiSell from '../assets/Tutorials/HindiSell.mp4'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom';
const Tutorial = () => {
  const history = useNavigate();
  const [videolan, setvideolan] = useState('English');
  const videos = [EnglishSell,HindiSell];
  const [videoshow, setvideoshow] = useState(EnglishSell);
  console.log(EnglishSell);
  useEffect(() => {
    if(videolan=='English')
    {
        setvideoshow(EnglishSell);
    }
    else{
        setvideoshow(HindiSell);
    }
  }, [videolan])
  return (
    <div className="tutorial__page">
        <div className="video__container">
            <div className="video">
            <ReactPlayer url={videoshow} controls={true}/>
            </div>
            <div className="lang__options">
            Choose Your Language
                <button className={videolan=="English"?"lang__btn active":"lang__btn"} onClick={()=>{
                    if(videolan=='English')
                    {
                        return;
                    }
                    setvideolan('English');
                }}>English</button>
                <button className={videolan=="Hindi"?"lang__btn active":"lang__btn"}
                    onClick={()=>{
                    setvideolan('Hindi');
                }}
                >Hindi</button>
            </div>
        </div>
        <div className="lang__btn back" onClick={()=>{
            history('/dashboard');
        }}>
            Go Back
        </div>
    </div>
  )
}

export default Tutorial

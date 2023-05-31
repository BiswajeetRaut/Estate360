import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Home.css'
const Home = () => { 
    const history = useHistory();
    function login()
    {
        history.push('/login');
        document.getElementsByClassName('page')[0].style.zIndex=-1;
        console.log(document.getElementsByClassName('page')[0].style.zIndex);
    }
  return (
    <>
    <div className="page" id='page1'></div>
    <div class="center">
    <h1 className='h1'>VI-GO</h1>
    <p style={{marginTop:10,marginBottom:20,fontSize:24,color:'white'}}>An Innovative Solution for VIT students that allows college <br></br> students to rent cycle directly from their hostels or on the go</p>
    <div class="btn" onClick={login}>Enter</div>
    </div>
    </>
    )
}

export default Home
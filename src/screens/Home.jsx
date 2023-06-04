import React, { useEffect, useState } from 'react'
import './home.css'
import Card from '../components/Card';
import db from '../firebase'
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search';
const Home = () => {
    
    const [land, setLand] = useState([])
    const navigate = useNavigate()
    var index = 0;
    const [currentImage, setCurrentImage] = useState(0);
    var imgs = ['https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/461960/pexels-photo-461960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/4406329/pexels-photo-4406329.jpeg',
        'https://images.pexels.com/photos/6129525/pexels-photo-6129525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
        
        useEffect(() => {
            db.collection('Lands').get().then((snapshot)=>{
            const dbData = [];
            snapshot.forEach((doc)=>{
                const dat=doc.data()
                dat['landId']=doc.id
                dbData.push(dat);
            })
            setLand(dbData);
        })
    }, [])

    setInterval(() => {
        try {
            index = (index + 1) % 4;
            document.getElementsByClassName('home-container')[0].style.backgroundImage = 'url(' + imgs[index] + ')'
        }
        catch (e) {

        }
    }, 4000);
    console.log(land)
    // const divStyle = {
    //     backgroundImage: `url(${images[currentImage]})`,
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     transition: 'background-image 1s ease-in-out'
    // };
    return (
        <div className="landing-home">
            <div className='home-container' >
                {/* <img src={homebg} alt="" /> */}
                <span className="title">Estate360:</span>
                <span className='subtitle'>Your Gateway to Land Ownership</span>
            </div>
            <div className="search">
                <Search />
            </div>
            <div className="card-heading"><strong>Popular Properties</strong>
                <a href='#' onClick={() => navigate('/listing')}>View All →</a>
            </div>
            <div className="card-listing">
                {
                    land.map((ele) => <Card land_det={ele} />)
                }

            </div>
        </div>
    )
}

export default Home

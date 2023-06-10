import React, { useEffect, useState } from 'react'
import './listing.css'
import db from '../firebase';
import Card from '../components/Card'
import Search from '../components/Search'
import { useSelector } from 'react-redux';
import { selectSearchValues } from '../features/dashboard/dashboardSlice';
import Header from '../components/Header';
const Listing = () => {
    const [selectPosition, setSelectPosition] = useState(null);
    const [land, setLand] = useState([]);
    const search = useSelector(selectSearchValues);
    const [place, setPlace] = useState(search.place==undefined ? "" : search.place);
    const [min,setmin]=useState(search.min==undefined ? 0: search.min);
    const [max,setmax]=useState(search.max==undefined ? 0: search.max);
    console.log(search);
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        db.collection('Lands')
        .get().then((snapshot) => {
        console.log(snapshot);
            var dbData = [];
            snapshot.forEach((doc) => {
                if(doc.data().location.includes(search.place) && doc.data().price>=search.min && doc.data().price<=search.max)
                {
                    const dat = doc.data()
                    dat['landId'] = doc.id
                    dbData.push(dat);
                }
            })
            setLand(dbData);
        })
    }, [search])

    return (
        <div className='listingScreen'>
        <Header></Header>
            <div className="filter">
                <Search selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
            </div>
            <div className="listing-heading">
                <h1>Available Properties:</h1>
            </div>
            <div className="list">
                {
                    land.map((ele) => <Card land_det={ele} />)
                }
            </div>
        </div>
    )
}

export default Listing

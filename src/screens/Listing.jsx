import React, { useEffect, useState } from 'react'
import './listing.css'
import db from '../firebase';
import Card from '../components/Card'
import Search from '../components/Search'
const Listing = () => {
    const [selectPosition, setSelectPosition] = useState(null);
    const [land, setLand] = useState([])
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        db.collection('Lands').get().then((snapshot) => {
            const dbData = [];
            snapshot.forEach((doc) => {
                const dat = doc.data()
                dat['landId'] = doc.id
                dbData.push(dat);
            })
            setLand(dbData);
        })
    }, [])

    return (
        <div className='listingScreen'>
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

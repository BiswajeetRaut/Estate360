import React, { useEffect, useState } from 'react'
import './search.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { ImLocation2 } from "react-icons/im";
import { AiFillDollarCircle } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import db from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchValues, setSearchValues } from '../features/dashboard/dashboardSlice';
const Search = (props) => {
  const [listPlace, setListPlace] = useState([]);
  const [allplace,setallplace] = useState([]);
  const search = useSelector(selectSearchValues);
  const [place, setPlace] = useState(search.place==undefined ? "" : search.place);
  const [min,setmin]=useState(search.min==undefined ? 0: search.min);
  const [max,setmax]=useState(search.max==undefined ? 0: search.max);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(listPlace);
  useEffect(() => {
    db.collection('Lands').onSnapshot(snapshot=>{
      var documents = [];
      snapshot.docs.map((doc)=>{    
        documents.push(doc.data().location);
      })
      setallplace(documents);
    })
  }, []);
  useEffect(()=>{
    setPlace(search.place);
    setmin(search.min);
    setmax(search.max);
  },[search])
  return (
    <div className='search-cont'>
      <div className='search-home'>

          <div className="cri">
            <div className="icon-text"><ImLocation2 /> <span> Location</span> <br /></div>
            <input type="text" placeholder='enter location' value={place} required
            onChange={(e)=>{
              setPlace(e.target.value);
              setListPlace(allplace.filter((item)=>{
                if(item.includes(e.target.value))
                {
                  return item;
                }
              }))
            }}
            />
          </div>
          <div className="cri">
            <div className="icon-text"><AiFillDollarCircle /><span>Max Price</span><br /></div>
            <input type="number" name="" id="" placeholder='max price' value={max} onChange={(e)=>{
              setmax(e.target.value);
            }}/>
          </div>
          <div className="cri">
            <div className="icon-text"><AiFillDollarCircle /><span>Min Price</span><br /></div>
            <input type="number" name="" id="" placeholder='min price' value={min} onChange={(e)=>{
              setmin(e.target.value);
            }}/>
          </div>
        <button className='search-button' type='submit' onClick={() => {
          navigate('/listing');
          dispatch(
                  setSearchValues({
                    search:{
                      place: place,
                      min: min,
                      max: max
                    }
                  })
                )
        }}>Search</button>
      </div>
      {listPlace.length!=0 && <div className='search-result'>
        <List component="nav" aria-label="main mailbox folders"
          sx={{
            zIndex: '10',
            position: 'absolute',
            left: '25%',
            display: place ? 'in-line' : 'none',
            width: '50%',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
            justifyContent: 'space-around',
            backgroundColor: ' white',
            borderRadius: ' 15px',
          }}
        >
          {listPlace.length!=0 && listPlace.map((item,index) => {
            return (
              <div key={index}>
                <ListItem
                  onClick={() => {
                    setListPlace([])
                    setPlace(item)
                  }}
                >
                  <ListItemText primary={item} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>}
    </div>
  )
}

export default Search

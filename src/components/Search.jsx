import React, { useState } from 'react'
import './search.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { ImLocation2 } from "react-icons/im";
import { AiFillDollarCircle } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
const Search = (props) => {
  const { selectPosition, setSelectPosition } = props;
  const [listPlace, setListPlace] = useState();
  const [place, setPlace] = useState();
  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
  const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
  };
  const navigate = useNavigate()
  console.log(listPlace)
  return (
    <div className='search-cont'>
      <div className='search-home'>

          <div className="cri">
            <div className="icon-text"><ImLocation2 /> <span> Location</span> <br /></div>
            <input type="text" placeholder='enter location' value={place} required
              onChange={(event) => {
                setPlace(event.target.value)
                const params = {
                  q: event.target.value,
                  format: "json",
                  addressdetails: 1,
                  polygon_geojson: 0,
                };
                const queryString = new URLSearchParams(params).toString();
                const requestOptions = {
                  method: "GET",
                  redirect: "follow",
                };
                fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                  .then((response) => response.text())
                  .then((result) => {
                    setListPlace(JSON.parse(result));
                  })
                  .catch((err) => console.log("err: ", err));
              }}
            />
          </div>
          <div className="cri">
            <div className="icon-text"><AiFillDollarCircle /><span>Max Price</span><br /></div>
            <input type="number" name="" id="" placeholder='max price' />
          </div>
          <div className="cri">
            <div className="icon-text"><AiFillDollarCircle /><span>Min Price</span><br /></div>
            <input type="number" name="" id="" placeholder='min price' />
          </div>
        <button className='search-button' type='submit' onClick={() => {
          navigate('/listing')
        }}>Search</button>
      </div>
      <div className='search-result'>
        <List component="nav" aria-label="main mailbox folders"
          sx={{
            // overflowY:'scroll',
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
          {listPlace && listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <ListItem
                  onClick={() => {
                    setSelectPosition(item);
                    setListPlace(null)
                    setPlace(item?.display_name)
                  }}
                >
                  <ListItemText primary={item?.display_name} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  )
}

export default Search

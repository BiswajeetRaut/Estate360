import React, { useEffect, useState } from 'react';
import './map.css';
import placeicon from './placeholder.png';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { useDispatch } from 'react-redux';
import { setMapValues } from '../features/dashboard/dashboardSlice';
const Map = ({latitude,longitude,term}) => {
  const dispatch = useDispatch();
  const [coord,setCoord] = useState([19.3,84.7])
  const icon = L.icon({
    iconUrl: placeicon,
    iconSize: [34, 34]
  });
  useEffect(() => {
    setCoord([latitude,longitude]);
  }, [latitude,longitude])
  // console.log(latitude,longitude);
  const MapClickHandler = () => {
    const handleClick = (event) => {
      const { lat, lng } = event.latlng;
      setCoord([lat,lng])
      console.log('Clicked coordinates:', lat, lng);
      dispatch(setMapValues({
        map:[lat,lng],
      }))
    };

    useMapEvents({
      click: handleClick
    });

    return null;
  };


  return (
    <div className='map-leaflet' style={{width:`100%`}}>
      <MapContainer center={coord} zoom={term?3:10} scrollWheelZoom={false} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=rso8CExorIToPrWld3QF"
        />
        <Marker position={coord} icon={icon}>
          <Popup>
          </Popup>
        </Marker>
       {term && <MapClickHandler />}
      </MapContainer>
    </div>
  );
};

export default Map;
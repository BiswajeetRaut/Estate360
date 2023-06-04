import React from 'react'
import'./map.css'
import placeicon from './placeholder.png'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet'
const Map = () => {
    const icon = L.icon({
        iconUrl: placeicon,
        iconSize:[34,34]
    })
    const position = [51.505, -0.09]
  return (
    <div className='map-leaflet'>
        <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{height:'100%'}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=rso8CExorIToPrWld3QF"
    />
    <Marker position={position} icon={icon}>
      <Popup>
        Location
      </Popup>
    </Marker>
  </MapContainer>,
    </div>
  )
}

export default Map

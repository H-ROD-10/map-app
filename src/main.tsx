
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapsApp } from './MapsApp'
import './styles.css'


import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVjdG9yMTAiLCJhIjoiY2w3YjBqY3g3MGJvZzNvcGh1cXg0cXFzZyJ9.W5NXiZKXm8He2-vXaX2PIQ';

if(!navigator.geolocation){
  alert('Tu navegador no tiene acceso a la geolocalizacion')
  throw new Error('Tu navegador no tiene acceso a la geolocalizacion')
}



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
)

import { useContext, useLayoutEffect, useRef } from "react"
//@ts-ignore
import mapboxgl from '!mapbox-gl';
import { PlacesContext, MapContext } from '../context';
import { Loading } from "./Loading";



export const MapView = () => {

  const {isLoading, userLocation} = useContext(PlacesContext)
  const {setMap} = useContext(MapContext)


  const mapDiv = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if(!isLoading){
      const map = new mapboxgl.Map({
        container: mapDiv.current!, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
        //projection: 'globe' as string// display the map as a 3D globe
        });

        setMap(map)
    }
  }, [isLoading])

  return (
    <>
        {
          isLoading? 
            <Loading /> : 
            <div 
              ref={mapDiv} 
              style={{ 
                  width:'100vw', 
                  height:'100vh', 
                  position:'fixed',
                  top: 0,
                  left: 0
                }}
            >
              {userLocation?.join(',')}
            </div>
        }
    </>
  )
}

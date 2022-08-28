import { useContext } from 'react';
import { MapContext,  PlacesContext } from '../context';



export const BtnMyLocations = () => {

    const { mapIsReady, map } = useContext(MapContext)

    const { userLocation } = useContext(PlacesContext)


    const onClick = () =>{
        if( !mapIsReady ) throw new Error('Mapa no disponible')
        if( !userLocation ) throw new Error('Ubicacion del Usuario no disponible')

        map?.flyTo({
            zoom: 14,
            center: userLocation
        })
    }
    
  return (
    <button 
        className="btn btn-secondary"
        style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 999
        }}
        onClick={ onClick }
    >
        Mi Ubicacion
    </button>
  )
}

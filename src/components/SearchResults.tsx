import { useContext, useState } from 'react';
import { PlacesContext, MapContext } from '../context';
import { Feature } from '../interfaces/places';



export const SearchResults = () => {

    const [activePlaceId, setActivePlaceId] = useState("")

    const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext)

    const { map, getRouteBetweenPoint } = useContext(MapContext)

    const onPlacesClicked = (place: Feature) =>{
        setActivePlaceId(place.id)
        const [lng, lat] = place.center
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })
    }
    const getRoute = (place: Feature)=>{
        if(!userLocation) return;

        const [lng, lat] = place.center;

        getRouteBetweenPoint(userLocation, [lng, lat])
    }
    return (
        isLoadingPlaces? <p className='alert alert-primary mt-2'>Cargando....</p> :  
            <ul className="list-group mt-3">
                {
                    places.map((place)=>(
                        <li 
                            className={`list-group-item list-group-item-action pointer ${activePlaceId === place.id ? 'active' : ''} `}
                            key={place.id} 
                            onClick={()=> onPlacesClicked(place)}
                        >
                            <h6>{place.text_es}</h6>
                            <p  style={{fontSize: '12px'}}>
                                {place.place_name_es}
                            </p>
                            <button 
                                className={`btn btn-sm ${activePlaceId === place.id ? 'btn-outline-light ': 'btn-outline-primary'}`}
                                onClick={() => getRoute(place)}
                            >
                                Direcciones
                            </button>
                        </li>
                    ))
                }
            </ul>
  )
}

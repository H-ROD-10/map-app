import { useContext } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';


export const SearchResults = () => {
    const { places, isLoadingPlaces } = useContext(PlacesContext)
    return (
        isLoadingPlaces? <p className='alert alert-primary mt-2'>Cargando....</p> :  
            <ul className="list-group mt-3">
                {
                    places.map((place)=>(
                        <li className="list-group-item list-group-item-action" key={place.id}>
                            <h6>{place.text_es}</h6>
                            <p className="text-muted" style={{fontSize: '12px'}}>
                                {place.place_name_es}
                            </p>
                            <button className="btn btn-outline-primary btn-sm">
                                Direcciones
                            </button>
                        </li>
                    ))
                }
            </ul>
  )
}

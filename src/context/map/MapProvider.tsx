import { useReducer, useContext, useEffect } from 'react';
import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { MapReducer } from './MapReducer';
import { PlacesContext } from '../places/PlacesContext';

export interface MapState {
    mapIsReady: boolean;
    map?: Map;
    markers: Marker[];
}

interface Props{
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: MapState = {
    mapIsReady: false,
    map: undefined,
    markers: []
}

export const MapProvider = ({children}: Props )=> {
    
    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE)

    const {places} = useContext(PlacesContext)

    useEffect(()=>{

        //Borrar los marcadores vacios del mapa
        state.markers.forEach( marker => marker.remove())

        //Almacena los nuevos marcadores
        const newMArkers: Marker[] = []

        for (const place of places) {
            //extrae latitud y longitud
            const [lng, lat] = place.center

            //se crea el popup
            const popup = new Popup().setHTML(`
                <h6>${place.text_es}</h6>
                <p>${place.place_name_es}</p>
            `)

            //Se crea el mapa
            const newMarker = new Marker().setPopup(popup).setLngLat([lng, lat]).addTo(state.map!)

            //Se insertan los marcadores
            newMArkers.push(newMarker)
        }

        //TODO Limpiar polyline
        dispatch({type: 'setMarkers', payload: newMArkers})
    },[places])
    
    const setMap = (map: Map) =>{

        const myLocationPopUp = new Popup().setHTML(`
            <h4>Aqui estoy</h4>
        `)

        //Agregar marcador central
        new Marker({color: '#61DAFB'})
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopUp)
            .addTo(map)


        dispatch({
            type: "setMap",
            payload: map
        })
    }

  return (
    <MapContext.Provider value={{
            ...state,


            //Methods
            setMap
        }}
    >
        {children}
    </MapContext.Provider>
  )
}

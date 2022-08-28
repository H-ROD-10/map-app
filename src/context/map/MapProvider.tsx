import { useReducer, useContext, useEffect } from 'react';
//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";
import { MapContext } from "./MapContext";
import { MapReducer } from './MapReducer';
import { PlacesContext } from '../places/PlacesContext';
import { directionsApi } from '../../apis';
import { Directions } from '../../interfaces/directions';

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

    const getRouteBetweenPoint = async (start: [number, number], end: [number, number]) =>{

        //Respuesta de la Api
        const resp = await directionsApi.get<Directions>(`/${start.join(",")};${end.join(",")}`);

        //Se extrae la distacia, diracion y las coordenadas
        const {distance, duration, geometry} = resp.data.routes[0];

        //se extrae la coordenada
        const {coordinates: cords} = geometry

        // se traduce en km la distacia y los minutos
        let kms = distance / 1000;
            kms = Math.round(kms * 100);
            kms/=100;

        const minutes = Math.floor(duration / 60);

        // Para mostrar los 2 puntos de salida y llegada
       const bounds = new LngLatBounds(
        start, start
       );

       for (const cord of cords) {
            const newCords: [number, number] = [cord[0], cord[1]];

            bounds.extend(newCords)
       }

       state.map?.fitBounds(bounds, {
        padding: 200
       })

       //polyline
       const sourceData: AnySourceData = {
            type: 'geojson',
            data:{
                type:'FeatureCollection',
                features:[
                    {
                        type: 'Feature',
                        properties: {},
                        geometry:{
                            type:'LineString',
                            coordinates: cords
                        }
                    }
                ]
            }
       }

       //Todo remover polyline si existen
       if(state.map?.getLayer('RouteString')){
        state.map.removeLayer('RouteString')
        state.map.removeSource('RouteString')
       }


       //Creando la polyline
       state.map?.addSource('RouteString', sourceData)

       //Agregar estilos a polyline
       state.map?.addLayer({
        id:'RouteString',
        type:'line',
        source: 'RouteString',
        layout:{
            "line-cap": 'round',
            "line-join":'round'
        }, 
        paint:{
            "line-color": 'black',
            "line-width": 3
        }
       })
    }

  return (
    <MapContext.Provider value={{
            ...state,


            //Methods
            setMap,
            getRouteBetweenPoint
        }}
    >
        {children}
    </MapContext.Provider>
  )
}

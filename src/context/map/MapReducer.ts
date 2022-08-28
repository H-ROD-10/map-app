import { Map, Marker } from 'mapbox-gl';
import { MapState } from "./MapProvider";


type MapActions = 
    | {type: 'setMap', payload: Map}
    | {type: 'setMarkers', payload: Marker[]}


export const MapReducer = (state: MapState, action: MapActions): MapState =>{
    switch (action.type) {
        case "setMap":
            return{
                ...state,
                mapIsReady: true,
                map: action.payload
            }
        case 'setMarkers':
            return{
                ...state,
                markers: action.payload
            }
    
        default:
            return state;
    }
}
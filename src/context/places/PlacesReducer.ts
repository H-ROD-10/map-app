import { PlacesState } from './PlacesProviders';
import { Feature } from '../../interfaces/places';

type PlacesActions = 
    | { type: 'setUserLOcation', payload: [number, number]}
    | {type: 'setLoadingPlaces'}  
    | {type: 'setPlaces', payload: Feature[]}


export const PlacesReducer = (state: PlacesState, action: PlacesActions): PlacesState =>{
    switch (action.type) {
        case 'setUserLOcation':
            return{
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case 'setLoadingPlaces':
            return{
                ...state,
                isLoadingPlaces: true,
                places: []
            }
        case 'setPlaces':
            return{
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            }
    
        default:
            return state;
    }
}
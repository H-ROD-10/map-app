import { useEffect, useReducer } from 'react';
import { getUserLocation } from '../../helpers';
import { PlacesContext } from './PlacesContext';
import { PlacesReducer } from './PlacesReducer';
import { searchApi } from '../../apis';
import { PlacesResponse, Feature } from '../../interfaces/places';

export interface PlacesState{
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
}

interface Props{
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
}


export const PlacesProviders = ({children}: Props) => {
    const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE)

    useEffect(() => {
        getUserLocation().then(lngLat => dispatch({ type:'setUserLOcation', payload: lngLat }))
    }, [])
    

    const searchByQuery = async (query: string): Promise<Feature[]> =>{
        if (query.length === 0) {
            dispatch({type: 'setPlaces', payload: []})
            return []
        }; 
        if(! state.userLocation) throw new Error('No existe');

        dispatch({
            type:'setLoadingPlaces'
        })

        const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
            params:{
                proximity: state.userLocation?.join(",")
            }
        })
        

        dispatch({
            type:'setPlaces',
            payload: resp.data.features
        })

        return resp.data.features;
    }


  return (
    <PlacesContext.Provider  value={{
            ...state,

            //Methods
            searchByQuery
        }}
    >
        {children}
    </PlacesContext.Provider>
  )
}

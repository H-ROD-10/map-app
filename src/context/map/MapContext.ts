import { Map } from 'mapbox-gl';
import { createContext } from 'react';

interface MapProps{
    mapIsReady: boolean;
    map?: Map;

    //Methods
    setMap: (map: Map) => void;
    getRouteBetweenPoint: (start: [number, number], end: [number, number]) => Promise<void>
}
export const MapContext = createContext({} as MapProps)
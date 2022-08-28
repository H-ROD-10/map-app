import { MapProvider, PlacesProviders } from "./context"
import { HomeScreens } from "./screens"




export const MapsApp = () => {
  return (
    <PlacesProviders>
      <MapProvider>
       <HomeScreens/>
      </MapProvider>
    </PlacesProviders>
  )
}

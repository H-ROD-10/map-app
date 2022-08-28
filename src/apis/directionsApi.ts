import axios from 'axios'

const directionsApi = axios.create({
    baseURL:'https://api.mapbox.com/directions/v5/mapbox/driving',
    params:{
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiaGVjdG9yMTAiLCJhIjoiY2w3YjBqY3g3MGJvZzNvcGh1cXg0cXFzZyJ9.W5NXiZKXm8He2-vXaX2PIQ'

    }
})

export default directionsApi;
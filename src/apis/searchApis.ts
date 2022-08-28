import axios from 'axios'

export const searchApi = axios.create({
    baseURL:'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params:{
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoiaGVjdG9yMTAiLCJhIjoiY2w3YjBqY3g3MGJvZzNvcGh1cXg0cXFzZyJ9.W5NXiZKXm8He2-vXaX2PIQ'

    }
})

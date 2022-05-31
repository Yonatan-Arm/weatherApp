import { weatherService } from '../../service/weather.service.js'

export function loadWeather(filterBy) {
  return async (dispatch) => {
    try {
      const weathers = await weatherService.query(filterBy, 5)
      dispatch({ type: 'SET_weatherS', weathers })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
  
export function loadFavoritePlaces() {
  return async (dispatch) => {
    try {
      const favoritePlaces = await weatherService.loadFavoritePlaces()
      dispatch({ type: 'SET_FAVORITEPLACES', favoritePlaces })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
  


export function removeWeather(weatherId) {
  return async dispatch => {
    try {
      await weatherService.remove(weatherId)
      dispatch({ type: 'REMOVE_weather', weatherId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}


 export function updateWeather(weather) {
    return async dispatch => {
        try {
          weather.weather= await weatherService.updateCity(weather.name);
            await weatherService.save(weather);
            dispatch({ type: 'UPDATE_weather', weather });
        } catch (err) {
            console.log('err:', err);
        }
    };
}






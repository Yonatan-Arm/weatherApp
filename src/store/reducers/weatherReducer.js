const INITIAL_STATE = {
  weathers: null,
  filterBy: {
    city:'',
  },
  favoritePlaces:null,
}

export function weatherReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_weatherS':
      return {
        ...state,
        weathers: action.weathers,
      }


    case 'REMOVE_weather':
      return {
        ...state,
        favoritePlaces: state.favoritePlaces.filter((weather) => weather._id !== action.weatherId),
      }

    case 'UPDATE_weather':
      return {
        ...state,
        weathers: state.weathers.map((weather) =>
        weather._id === action.weather._id ? action.weather : weather
        ),
      }
    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: { ...action.filterBy },
      }
    case 'SET_FAVORITEPLACES':
      return {
        ...state,
        favoritePlaces: action.favoritePlaces,
      }

    default:
      return state
  }
}

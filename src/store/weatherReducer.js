import {
  WEATHER_REQUEST,
  WEATHER_SUCCESS,
  WEATHER_FAILURE,
  WEATHER_RESET,
} from './actionTypes'

const initialState = {
  status: 'idle', // idle | loading | success | error
  error: null,
  place: null,
  current: null,
  daily: [],
}

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case WEATHER_REQUEST:
      return { ...state, status: 'loading', error: null }

    case WEATHER_SUCCESS:
      return {
        ...state,
        status: 'success',
        error: null,
        place: action.payload.place,
        current: action.payload.current,
        daily: action.payload.daily,
      }

    case WEATHER_FAILURE:
      return { ...state, status: 'error', error: action.error }

    case WEATHER_RESET:
      return initialState

    default:
      return state
  }
}

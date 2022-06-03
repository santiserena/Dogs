import { DATA_SOURCE, GET_ALL_BREEDS, GET_TEMPERAMENTS } from "./actions";


const initialstate = {
allBreeds:[],
temperaments:[],
filtered:[]
}

export default function rootReducer(state = initialstate, action) {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        allBreeds: action.payload,
        filtered: action.payload
      }

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }  
    
    case DATA_SOURCE:
      if (action.payload === 'traditionals'){
        let source = state.allBreeds.filter ( e => typeof (e.id) === 'number')
        return {
          ...state,
          filtered: source  
        }
      }
      if (action.payload === 'users'){
        let source = state.allBreeds.filter ( e => typeof (e.id) === 'string')
        return {
          ...state,
          filtered: source  
        }
      }
      return {
        ...state,
        filtered: state.allBreeds
      }; 

    default:
      return state;
  }
}


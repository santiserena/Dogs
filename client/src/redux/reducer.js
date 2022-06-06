import { /* DATA_SOURCE, */ DO_FILTERS, GET_ALL_BREEDS, GET_TEMPERAMENTS } from "./actions";


const initialstate = {
allBreeds:[],
temperaments:[],
filtered:[],

temperamentsSelected:[],
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

    case DO_FILTERS:

      // temperament filter
      let array=state.allBreeds

      if (action.payload.sltTemp){
        array = state.allBreeds?.filter ( e => e.temperament?.includes(action.payload.sltTemp))
      }
      
      if (state.temperamentsSelected.length){  //if there's something in temperamentsSelected, do filter
        for (let value of state.temperamentsSelected){
          array = array?.filter ( e => e.temperament?.includes (value))
        }
      }
      
      //name filter

      if (action.payload.sltName) array = array?.filter( e => e.name.toLowerCase().includes(action.payload.sltName.toLowerCase()))

      //source filter

      if(action.payload.sltSource === "users") {
        array = array.filter ( e => typeof e.id !== 'number')
      }
      if(action.payload.sltSource === "traditionals") {
        array = array.filter ( e => typeof e.id === 'number')
      }

      
      
      return {
        ...state,
        temperamentsSelected:action.payload.hasOwnProperty('sltTemp') ? [...state.temperamentsSelected, action.payload.sltTemp]: state.temperamentsSelected,
        filtered: array,
         
      }
      
      
      /*  case DATA_SOURCE:
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
      };  */

    default:
      return state;
  }
}


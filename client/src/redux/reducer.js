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
        allBreeds: action.payload.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
        }),
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

      //default alphabetical or weight order

      if(action.payload.sltAlpWeight === "weight"){
        array = array.sort(function (a, b) {
          if (a.weight[0] > b.weight[0]) return 1;
          if (a.weight[0] < b.weight[0]) return -1;
          return 0;
        });
      }

      //ascending or descending order

      if(action.payload.sltAscDes === "Descending"){
        console.log('descendiente');
        array=array.reverse();
      } 
      
      return {
        ...state,
        temperamentsSelected:action.payload.hasOwnProperty('sltTemp') ? [...state.temperamentsSelected, action.payload.sltTemp]: state.temperamentsSelected,
        filtered: array,
      }
      
    default:
      return state;
  }
}


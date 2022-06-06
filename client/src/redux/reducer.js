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
      console.log('inicial' , action.payload);

      if (action.payload.sltTemp){
        array = array.filter ( e => e.temperament?.includes(action.payload.sltTemp))
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
        
        array = array.filter ( e => e.weight[0] && e.weight[1])

        for (let i = 0; i < array.length; i++) {
          var aux = array[i];
          for (let j = 0; j < i; j++) {
            if(aux.weight[1]  <  array[j].weight[1]){
              aux = array[j];
              array [j] = array[i]
              array [i] = aux;
            }
          }
        }
      }

      //ascending or descending order

      if(action.payload.sltAscDes === "Descending"){
          let aux = []   //couldnt use reverse()
          for (let i = 0; i < array.length; i++) {
            aux.unshift(array[i]) 
          }
          array=aux
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


import axios from 'axios';
export const GET_ALL_BREEDS = 'GET_ALL_BREEDS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const DO_FILTERS = 'DO_FILTERS';
export const REMOVE_TEMPERAMENT = 'REMOVE_TEMPERAMENT';


export const getAllBreeds = () => (dispatch) => {
  return axios.get ('http://localhost:3001/dogs')
    .then((response) =>
      dispatch({
        type: GET_ALL_BREEDS,
        payload: response.data,
      })
    )
    .catch((error) => console.log(error));
};

export const getTemperaments = () => (dispatch) => {
  return axios.get ('http://localhost:3001/temperament')
    .then((response) =>
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: response.data,
      })
    )
    .catch((error) => console.log(error));
};

export const doFilters = (indications) => {
  return {
    type: DO_FILTERS,
    payload: indications
  }
}  

export const removeTemperament = (t) => {
  return {
    type: REMOVE_TEMPERAMENT,
    payload: t
  }
}  












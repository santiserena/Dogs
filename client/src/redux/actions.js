import axios from 'axios';
export const GET_ALL_BREEDS = 'GET_ALL_BREEDS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const DATA_SOURCE = 'DATA_SOURCE';


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

export const dataSource = (source) => {
  return {
    type: DATA_SOURCE,
    payload: source
  }
}












//import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Breed (){

   /* const {id} = useParams();
   console.log('llegue aaca', id);
    
   const data = () => {
       return axios
       .get(`http://localhost:3001/dogs/${id}`)
       .then((result) => result.data)
       .then((result) =>{})
    }  */


    

    return (
        <div>
            <Link to = '/home'><button>Go back home</button></Link>
            <h3>soy el detalle de la raza</h3>

            


        </div>
    )
}
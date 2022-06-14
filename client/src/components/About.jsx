import React from "react";
import { Link } from "react-router-dom";

export default function About(){
 return(
    <div>
        <Link to = '/home'><button>Go back home</button></Link>
        <h1>soy el aboooout y tengo info de la tecnologias usadas y de mi contacto</h1>
    </div>
 )   
}
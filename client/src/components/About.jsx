import React from "react";
import { Link } from "react-router-dom";

export default function About(){
 return(
    <div>
        <Link to = '/home'><button>Go back home</button></Link>
        
        <h1>Technologies used for this application:</h1>
        <h5>Frontend:</h5>
        <p>JavaScript, React, Redux, React Router Dom v6, Axios, Css </p>
        <h5>Backend:</h5>
        <p>Node JS, Express, Axios</p>
        <h5>Database:</h5>
        <p>SQL, PostgresSQL</p>
        <h1>Contact:</h1>
        <p>poner linquedin y CV</p>
    </div>
 )   
}
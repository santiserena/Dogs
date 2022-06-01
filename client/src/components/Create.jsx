import React from "react";
import { Link } from "react-router-dom";

export default function Create(){

    return (
        <div>
            <Link to = '/home'><button>Go back home</button></Link>
            <h3>soy el creador</h3>
        </div>
    )
}
import React from "react";
import {Link} from 'react-router-dom'

export default function Start (){
    return(
        <div>
            <h1>start con imagen</h1>
            <Link to='/home'><button>Lets get started</button> </Link>
        </div>
    )
}


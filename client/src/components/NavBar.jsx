import React from "react";
import { Link } from "react-router-dom";

export default function NavBar (){
    return (
        <div>
            <Link to = '/create'><button>Add a new dog breed</button></Link>
            <Link to = '/'><button>Start over</button></Link>
        </div>
    )
}


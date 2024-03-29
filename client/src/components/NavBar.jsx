import React from "react";
import { Link } from "react-router-dom";
import st from './NavBar.module.css'

export default function NavBar (){
    return (
        <div className={st.t}>
            <Link to = '/create'><button className={st.bu}>Add a new dog breed</button></Link>
            <Link to = '/deletebreed'><button className={st.bu}>Delete a created breed </button></Link>
            <Link to = '/'><button className={st.bu}>Start over</button></Link>
            <Link to = '/about'><button className={st.bu}>About</button></Link>
        </div>
    )
}


import React from "react";
import {Link} from 'react-router-dom'
import st from './Start.module.css'

export default function Start (){
    return(

        <div className={st.t}>
            <div>
                <Link to='/home'>{<button className={st.bu}>Lets get started</button>}</Link>
            </div>        
                
        </div>    
    )
}


import React from "react";
import {Link} from 'react-router-dom'
import st from './Start.module.css'

export default function Start (){
    return(
        <div  className={st.im}>


            <div className={st.bu}>
               {/*  <h1>esta es mi pag de perros</h1> */}
                
                <Link to='/home' className={st.s}><button className={st.b}>Lets get started</button> </Link>

            </div>
        
        </div>
    )
}


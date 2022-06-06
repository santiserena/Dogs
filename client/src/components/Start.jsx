import React from "react";
import {Link} from 'react-router-dom'
import picture from "../images/StartImage.png";
import st from './Start.module.css'

export default function Start (){
    return(
        <div  className={st.all}>
            <div>
                <img src={picture} alt="Not found" className={st.s} />
            </div>

            <div className={st.bu}>
                <Link to='/home' className={st.s}><button>Lets get started</button> </Link>
            </div>

        </div>
    )
}


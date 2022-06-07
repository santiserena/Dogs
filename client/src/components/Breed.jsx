import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import footprints from '../images/footprints.jpg';
import st from './Breed.module.css';

export default function Breed (){

   const [myState, setMyState] = useState({image: footprints}); 
   const {id} = useParams();
   
   
   React.useEffect(() =>{
    axios
       .get(`http://localhost:3001/dogs/${id}`)
       .then((result) => (setMyState(result.data)))
       .catch ( e => console.log(e))                   

       return () => {setMyState({})}    //DEJAR ERROR POR AHORA
    },[id])

    return (
            <div className={st.t}>
                <div className={st.buEs}>
                    <Link to = '/home'><button className={st.bu}>Go back home</button></Link>
                    <div className={st.sp}><h3 className={st.name}>{myState.name}</h3></div>
                </div>
                <div className={st.i}>
                    <div className={st.so}>

                           
                        <div className={st.in}> 
                            <img src={myState.image} className={st.ima} alt="not found" />
                        </div>
                        <div className={st.inf}>
                            {myState.weight ? <p>Weight: {myState.weight[0]}-{myState.weight[1]} lb.</p> : null}   
                            {myState.height ? <p>Height: {myState.height[0]}-{myState.height[1]} In.</p> : null}
                            {myState.lifeSpan? <p>LifeSpan: {myState.lifeSpan[0]-myState.lifeSpan[1]} years.</p> : null}{/* hacer abajo */}
                            {myState.temperament ? <p>Temperaments: {myState.temperament?.join(', ')}</p> : null}
                        </div>    
                    </div>
                </div>    
            </div>
    )
}
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
                <div>
                    <Link to = '/home'><button>Go back home</button></Link>
                </div>
                <div className={st.i}>
                    <div>
                        <h3>{myState.name}</h3>
                    </div>
                    <div>
                        <img src={myState.image} width="193" height="130" alt="not found" />
                    </div>
                    <div>
                        {myState.weight ? <p>weight: {myState.weight}</p> : null}   
                        {myState.height ? <p>height: {myState.height}</p> : null}

                        {myState.lifeSpan? <p>lifeSpan: {myState.lifeSpan}</p> : null}{/* hacer abajo */}
                        {myState.temperament ? <p>temperaments: {myState.temperament?.join(', ')}</p> : null}
                    </div>    
                </div>    
            </div>
    )
}
import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import footprints from '../images/footprints.jpg';

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
        

            <div>
                <Link to = '/home'><button>Go back home</button></Link>
                <h3>{myState.name}</h3>

                <img src={myState.image} width="193" height="130" alt="not found" />
                
                {myState.weight ? <p>weight: {myState.weight}</p> : null}   
                {myState.height ? <p>height: {myState.height}</p> : null}

                {myState.lifeSpan? <p>lifeSpan: {myState.lifeSpan}</p> : null}{/* hacer abajo */}
                {myState.temperament ? <p>temperaments: {myState.temperament?.join(', ')}</p> : null}
            </div>
    )
}
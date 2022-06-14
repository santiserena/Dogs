import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Delete(){

    const [myState, setMyState] = useState ([]);
    
    useEffect(() =>{
        getDb();
        return () => {setMyState({})}
    },[])
    
    function getDb (){
        axios
        .get(`http://localhost:3001/dogs`)
        .then((result) => (setMyState(result.data.filter( el => typeof el.id !== 'number'))))
        .catch ( e => console.log(e))                   

    }
    
    function deleteBreed(id){
        axios
        .delete(`http://localhost:3001/erase/${id}`)
        .then(() => (getDb()))
        .catch ( e => console.log(e)) 
        alert ('The content was successfully deleted')
    }
    
 return(
    <div>
        <Link to = '/home'><button>Go back home</button></Link>
        <h1>Delete breed</h1>
        <h5>Remember that once the content is deleted, it will be unrecoverable</h5>
        {myState?.map ( el => <div key={el.id}>
            <p>{el.name}</p><button onClick={ () => deleteBreed(el.id)}>Delete</button>
            </div>)}
        {!myState?.length && <h1>There is nothing to erase</h1>}
    </div>
 )      
}
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments } from "../redux/actions";

export default function Create(){

    const dispatch = useDispatch();
    
    useEffect (()=>{
        dispatch(getTemperaments())
    },[dispatch])

    const temp = useSelector ( state => state.temperaments);

    const [myState, setMyState] = useState ({temperaments: []})
    const [error, setError] = useState({
        name : 'vacioooooooo',
        maxWeight:'vacioooooooo',
        minWeight:'vacioooooooo',
        maxHeight:'vacioooooooo',
        minHeight:'vacioooooooo'
    });

    const handleOnChange = async e =>{
        setMyState({
            ...myState,
            [e.target.name] : e.target.name === 'temperaments' ? [...myState.temperaments, e.target.value] : e.target.value         
        })
        validate()
    }    

    
    const validate = () => {
        !myState.name? setError({ ...error, name: 'vacioooooooo'}) : setError({ ...error, name: 'llenooooooo'}) 
        
    }    


        
        


    return (
        <form>
            <Link to = '/home'><button>Go back home</button></Link>
            
            <p>Enter breed name</p>
            
            <input name='name' onChange={handleOnChange}/>

            <p>Maximum and minimum weight</p>
            <input name='maxWeight' onChange={handleOnChange}/>
    <br/>   <input name='minWeight' onChange={handleOnChange}/>

            <p>Maximum and minimum height</p>
            <input name='maxHeight' onChange={handleOnChange}/>
    <br/>   <input name='minHeight' onChange={handleOnChange}/>

            <p>Average life expectancy</p>
            <input name='lifeSpan' onChange={handleOnChange}/>

            <p>Url with the image of the breed</p>
            <input name='image' onChange={handleOnChange}/>

    <br/>   <p>Select one or more temperaments</p>  
            <select name='temperaments' onChange={handleOnChange}>
                {temp.map ( e => <option key = {e.id}>{e.name}</option> )}    
            </select>

        </form>
    )
}
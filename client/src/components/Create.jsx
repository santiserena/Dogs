import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../redux/actions";
import axios from "axios";


//PASAR A INGLESSSSSSSSSSSSSSSSSS

export default function Create(){

    const dispatch = useDispatch();
    const [myState, setMyState] = useState({error:{}, t:[]});

    useEffect (()=>{
        dispatch(getTemperaments())
    },[dispatch])

    const temp = useSelector ( state => state.temperaments);

    const handleOnChange = (e) =>{

      if(e.target.name !=='temperaments'){
          setMyState((prevState) => ({
              ...prevState, 
              [e.target.name]: e.target.value
            }))
        }

      else{
          let array = myState.t
          array.push(e.target.value)
          setMyState({...myState, t: array})
      } 
      
      validate()
    }
   
    
    const validate = () =>{

        let validateErrors ={
            name:'',
            weight:'',
            height:'',
            lifeSpan:''
        }
        
        if(!myState.name)  validateErrors.name = 'campo obligatotio'
        if(myState.name && myState.name?.match("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$")==null) validateErrors.name ="solo letras";
        
        if(!(myState.maxWeight && myState.minWeight))  validateErrors.weight = 'peso obligatorio';
        if(myState.maxWeight && myState.maxWeight?.match("^[0-9]+$")==null) validateErrors.weight = 'ponga solo numeros';
        if(myState.minWeight && myState.minWeight?.match("^[0-9]+$")==null) validateErrors.weight = 'ponga solo numeros';
        
        if(!(myState.maxHeight && myState.minHeight))  validateErrors.height = 'altura obligatoria';
        if(myState.maxHeight && myState.maxHeight?.match("^[0-9]+$")==null) validateErrors.height = 'ponga solo numeros';
        if(myState.minHeight && myState.minHeight?.match("^[0-9]+$")==null) validateErrors.height = 'ponga solo numeros';
        
        if(myState.lifeSpan && myState.lifeSpan?.match("^[0-9]+$")==null) validateErrors.lifeSpan ="solo numeros para la expectativa";
        
        if(myState.image && !/^(ftp|http|https):\/\/[^ "]+$/.test(myState.image)) validateErrors.image ='url invalida';
        
        
        
        setMyState((prevState) => ({...prevState, error: validateErrors}))
    }
    
    const handleSubmit= (event) => {
        
        let toSend ={
            name: myState.name,
            height: `${myState.minHeight}-${myState.maxHeight}`,   
            weight: `${myState.minWeight}-${myState.maxWeight}`
        }
        if (myState.t.length) toSend.temperaments = myState.t;
        if (myState.lifeSpan) toSend.lifeSpan = `${myState.lifeSpan}`;
        if (myState.image) toSend.image = myState.image;
        
        
        axios.post('http://localhost:3001/dog', toSend)
        .then( response => alert('Breed added successfully!') )
        .catch ( error => {
            console.log('Error--->',error)
            alert ('Load Failed')
        })

        event.preventDefault();
       // alert('Breed added', myState)
       console.log('llegueeeeeeeee');
    }
    
    return (
        <form onSubmit={handleSubmit}>
              
            <Link to = '/home'><button>Go back home</button></Link>
            <p>Enter breed name</p>
            <input name='name' onChange={handleOnChange}/>
            <label>{myState.error.name}</label>

            <p>Maximum and minimum height</p>
            <input name='maxHeight' onChange={handleOnChange}/>
    <br/>   <input name='minHeight' onChange={handleOnChange}/>
            <label>{myState.error.height}</label>

            <p>Maximum and minimum weight</p>
            <input name='maxWeight' onChange={handleOnChange}/>
    <br/>   <input name='minWeight' onChange={handleOnChange}/>
            <label>{myState.error.weight}</label>

            <p>Average life expectancy</p>
            <input name='lifeSpan' onChange={handleOnChange}/>
            <label>{myState.error.lifeSpan}</label>

            <p>Url with the image of the breed</p>
            <input name='image' onChange={handleOnChange}/>
            <label>{myState.error.image}</label>


    <br/>   <p>Select one or more temperaments</p> 
            <select name='temperaments' onChange={handleOnChange}>
                {temp.map ( e => <option key = {e.id}>{e.name}</option> )}    
            </select>

            { myState.t.length && <label>selected: {myState.t.join(', ')}</label>}

    <br/><br/> 
            
            {myState.error.name === '' && myState.error.height === '' &&
                myState.error.weight === '' && myState.error.lifeSpan === ''&&
                <input type = "submit" value = 'submit' />}
        </form> 
    )
  };
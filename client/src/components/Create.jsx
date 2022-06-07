import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../redux/actions";
import axios from "axios";
import st from './Create.module.css'


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
        
        if(!myState.name)  validateErrors.name = 'Required fields'
        if(myState.name && myState.name?.match("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$")==null) validateErrors.name ="Only not numeric characters";
        
        if(!(myState.maxWeight && myState.minWeight))  validateErrors.weight = 'Required fields';
        if(myState.maxWeight && myState.maxWeight?.match("^[0-9]+$")==null) validateErrors.weight = 'Only numbers are allowed';
        if(myState.minWeight && myState.minWeight?.match("^[0-9]+$")==null) validateErrors.weight = 'Only numbers are allowed';
        
        if(!(myState.maxHeight && myState.minHeight))  validateErrors.height = 'Required fields';
        if(myState.maxHeight && myState.maxHeight?.match("^[0-9]+$")==null) validateErrors.height = 'Only numbers are allowed';
        if(myState.minHeight && myState.minHeight?.match("^[0-9]+$")==null) validateErrors.height = 'Only numbers are allowed';
        
        if(myState.lifeSpan && myState.lifeSpan?.match("^[0-9]+$")==null) validateErrors.lifeSpan ="Only numbers are allowed";
        
        if(myState.image && !/^(ftp|http|https):\/\/[^ "]+$/.test(myState.image)) validateErrors.image ='Invalid url';
        

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

        console.log(toSend);
        
        
        axios.post('http://localhost:3001/dog', toSend)
        .then( response => alert('Breed added successfully!') )
        .catch ( error => {
            console.log('Error--->',error)
            alert ('Load Failed')
        })

        event.preventDefault();
    }
    
    return (
        <form onSubmit={handleSubmit} className={st.t}>
                
            <Link to = '/home'><button className={st.bu}>Go back home</button></Link>

            <div className={st.in}>
                <div className={st.it}>
                    <h3>Enter breed name</h3>
                    <input name='name' onChange={handleOnChange}/>
                    <p>{myState.error.name}</p>
                </div>

                <div className={st.it}>
                    <h3>Maximum and minimum height</h3>
                    <input name='maxHeight' onChange={handleOnChange}/>
                    <br/><input name='minHeight' onChange={handleOnChange}/>
                    <label>Inches</label>
                    <p>{myState.error.height}</p>
                </div>

                <div className={st.it}>
                    <h3>Maximum and minimum weight</h3>
                    <input name='maxWeight' onChange={handleOnChange}/>
                    <br/><input name='minWeight' onChange={handleOnChange}/>
                    <label>Pounds</label>
                    <p>{myState.error.weight}</p>
                </div>

                <div className={st.it}>
                    <h3>Average life expectancy</h3>
                    <input name='lifeSpan' onChange={handleOnChange}/>
                    <label>Years</label>
                    <p>{myState.error.lifeSpan}</p>
                </div>

                <div className={st.it}>
                    <h3>Url with the image of the breed</h3>
                    <input name='image' onChange={handleOnChange}/>
                    <p>{myState.error.image}</p>
                </div>    

                <div className={st.it}>
                    <br/><h3>Select one or more temperaments</h3> 
                    <select name='temperaments' onChange={handleOnChange}>
                        {temp.map ( e => <option key = {e.id}>{e.name}</option> )}    
                    </select>

                    { myState.t.length && <label>selected: {myState.t.join(', ')}</label>}
                    <br/><br/> 
                    {myState.error.name === '' && myState.error.height === '' &&
                        myState.error.weight === '' && myState.error.lifeSpan === ''&&
                        <input type = "submit" value = 'submit' />}
                </div>
            </div>
        </form> 
    )
  };
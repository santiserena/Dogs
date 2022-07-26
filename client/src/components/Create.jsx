import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../redux/actions";
import axios from "axios";
import st from './Create.module.css';
import lens from '../images/lens.png';


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
 
          if (myState.t.find (el => el === e.target.value)) return;
           
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
        
        if(!myState.image) validateErrors.image ='Required fields';
        

        setMyState((prevState) => ({...prevState, error: validateErrors}))
    }
    
    const handleSubmit= (event) => {
        event.preventDefault();
        
        let toSend ={
            name: myState.name,
            height: `${myState.minHeight}-${myState.maxHeight}`,   
            weight: `${myState.minWeight}-${myState.maxWeight}`
        }
        if (myState.t.length) toSend.temperaments = myState.t;
        if (myState.lifeSpan) toSend.lifeSpan = `${myState.lifeSpan}`;
        if (myState.image) toSend.image = myState.image;
        
        
        axios.post('http://localhost:3001/dog', toSend)
        .then( response =>
            
            alert('Breed added successfully!') )
        .catch ( error => {
            console.log('Error--->',error)
            alert ('Load Failed')
        })

        //cleaning
        setMyState({error:{}, t:[]});
        document.getElementById ('name2').value = '';
        document.getElementById ('name3').value = '';
        document.getElementById ('name4').value = '';
        document.getElementById ('name5').value = '';
        document.getElementById ('name6').value = '';
        document.getElementById ('name7').value = '';
    }

    const base64Convert = (ev) => {
      let file = ev.target.files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = async function () {
        let base64 = fileReader.result;
        setMyState({ ...myState, image: base64 });
        validate();
      };
    };

    return (
      <form onSubmit={handleSubmit} className={st.t}>
        <Link to="/home">
          <button className={st.bu}>Go back home</button>
        </Link>

        <div className={st.in}>
          <div className={st.it}>
            <h3>Enter breed name</h3>
            <input id="name2" name="name" onChange={handleOnChange} />
            <p>{myState.error.name}</p>
          </div>

          <div className={st.it}>
            <h3>Maximum and minimum height</h3>
            <input name="maxHeight" id="name3" onChange={handleOnChange} />
            <br />
            <input name="minHeight" id="name4" onChange={handleOnChange} />
            <label> Inches</label>
            <p>{myState.error.height}</p>
          </div>

          <div className={st.it}>
            <h3>Maximum and minimum weight</h3>
            <input name="maxWeight" id="name5" onChange={handleOnChange} />
            <br />
            <input name="minWeight" id="name6" onChange={handleOnChange} />
            <label> Pounds</label>
            <p>{myState.error.weight}</p>
          </div>

          <div className={st.it}>
            <h3>Average life expectancy</h3>
            <input name="lifeSpan" id="name7" onChange={handleOnChange} />
            <label> Years</label>
            <p>{myState.error.lifeSpan}</p>
          </div>

          <div className={st.it}>
            <div className={st.pict}>



                <h3>Choose a picture</h3>

                <div className={st.lens}>
                    <label className={st.file} onChange={(ev) => base64Convert(ev)} htmlFor="formId">
                        <input name="" type="file" id="formId" hidden />
                            <img src={lens} alt="Not found" width="40" height="40" />
                    </label>
                </div>



            </div>

                <p>{myState.error.image}</p>
          </div>

            <div className={st.smallImg}>
              {myState.image ? (
                  <img
                  src={myState.image}
                  alt="Not found"
                  width="155"
                  height="100"
                  />
                  ) : null}
            </div>

          <div className={st.it}>
            <h3>Select one or more temperaments</h3>
            {
              <select name="temperaments" onChange={handleOnChange}>
                {temp.map((e) => (
                  <option key={e.id}>{e.name}</option>
                ))}
              </select>
            }
            {myState.t.length ? (
              <label> Selected: {myState.t.join(", ")}</label>
            ) : null}
            <br />
            <br />
            {myState.error.name === "" &&
              myState.error.height === "" &&
              myState.error.weight === "" &&
              myState.error.lifeSpan === "" && (
                <div className={st.sub}><input className={st.submitBu} type="submit" value="Submit" /></div>
              )}
          </div>
        </div>
        <div className={st.sa}></div>
      </form>
    );
  };
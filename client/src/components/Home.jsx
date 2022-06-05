import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { /* dataSource, */ getAllBreeds, getTemperaments } from "../redux/actions";
import ShowsCardsAndPagination from "./ShowsCardsAndPagination";


export default function Home (){

    const dispatch = useDispatch();
    const temp = useSelector ( state => state.temperaments);
    const allBreeds = useSelector (state => state.allBreeds);
    const [filteredState, setfiltered] = useState([])  
    const [myTemperaments, setMyTemperaments] = useState ([]) // cargar los temperamentos
    
    
    useEffect(() => {
      dispatch(getAllBreeds())
      dispatch(getTemperaments())
      
    },[dispatch]) 
    
    
    function filterOnChange (e){

      let filtered = allBreeds;

      let source = document.getElementById('source').value;
      let byName = document.getElementById('byName').value;
      let temp = document.getElementById('temp').value;
      
      
      
      setMyTemperaments ([...myTemperaments, temp])
        
      
      if(source === 'users') filtered = filtered?.filter ( elem => typeof elem.id === 'string')
      if(source === 'traditionals') filtered = filtered?.filter ( e => typeof e.id === 'number')
      if(byName) filtered = filtered?.filter ( elem =>  elem.name.toLowerCase().includes (byName.toLowerCase()))
  
      
      setfiltered(filtered)
    }

    
    /*   if (order === "alphabetical") filtered = filtered.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        }); */

    /*   if (order === "weight") { 
        filtered.forEach( elem => elem.weight.length===2 ? elem.weight = (elem.weight[0] + elem.weight[1])/2 : elem.weight = elem.weight[0] ) 
        
        filtered = filtered.sort(function (a, b) {
        if (a.weight > b.weight) return 1;
        if (a.weight < b.weight) return -1;
        return 0;
      }); 
    } */

      

    return (
      <div>
        <div>
          <h3>Search breeds by name:</h3>
          <input name='byName' id="byName" onChange={filterOnChange}/>
        </div>

        <div>
          <h3>Filter breeds by:</h3>
          <label>temperaments</label>
          
          <select id= 'temp' onChange = {filterOnChange}>
            {temp?.map ( e => <option key = {e.id}>{e.name}</option> )} 
          </select>

          <br />

          <label>file source </label>
          <select id='source' onChange={filterOnChange}>
            <option value="all the breeds">All</option>
            <option value="traditionals">Traditionals</option>
            <option value="users">Created by users</option>
          </select>
        </div>

        <div>
          <h3>Sort by:</h3>
          <select id = 'order' onChange={filterOnChange}>
            <option value="weight">weight</option>
            <option value="alphabetical">alphabetical order</option>
          </select>
        </div>


      {/* recibe array VV */} 
      <ShowsCardsAndPagination info = {allBreeds}/>  

      </div>
    );

}
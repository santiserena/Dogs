import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { /* dataSource, */ getAllBreeds, getTemperaments } from "../redux/actions";
import Card from "./Card";



export default function Home (){

    const dispatch = useDispatch();
    const temp = useSelector ( state => state.temperaments);
    const allBreeds = useSelector (state => state.allBreeds);
    const [filtered, setfiltered] = useState(allBreeds)   
  

    useEffect(() => {
        dispatch(getAllBreeds())
        dispatch(getTemperaments())
    },[dispatch]) 



    function filterOnChange (e){
      let filtered = allBreeds;

      if(e.target.value === 'users') filtered = filtered?.filter ( e => typeof e.id === 'string')
      if(e.target.value === 'traditionals') filtered = filtered?.filter ( e => typeof e.id === 'number')

      //if(e.target.value === 'alphabetical') filtered = filtered?.sort( e => e.name)

        //van todos los filtros
      setfiltered(filtered)
    }


    /* function filterOnChange (e){
      //e.target.value
      dispatch (dataSource(e.target.value));
    }
       */
      

    return (
      <div>
        <div>
          <h3>Search breeds by name:</h3>
          <input onChange={filterOnChange}/>
        </div>

        <div>
          <h3>Filter breeds by:</h3>
          <label>temperaments</label>
          
          <select>
            {temp.map ( e => <option key = {e.id}>{e.name}</option> )} 
          </select>

          <br />

          <label>file source </label>
          <select onChange={filterOnChange}>
            <option value="all the breeds">All</option>
            <option value="traditionals">Traditionals</option>
            <option value="users">Created by users</option>
          </select>
        </div>

        <div>
          <h3>Sort by:</h3>
          <select onChange={filterOnChange}>
            <option value="alphabetical">alphabetical order</option>
            <option value="weight">weight</option>
          </select>
        </div>

        {/* {allBreeds.map((e) => ( */}
        {filtered.map((e) => (
          <Card
            key={e.id}
            id={e.id}
            name={e.name}
            height={e.height}
            weight={e.weight}
            image={e.image}
            temperament={e.temperament}
          />
        ))}
      </div>
    );

}
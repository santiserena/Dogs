import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { dataSource, getAllBreeds } from "../redux/actions";
import Card from "./Card";


export default function Home (){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBreeds())
    },[dispatch]) 

    let filtered = useSelector (state => state.filtered)

    function handleOnChange (e){
      //e.target.value
      dispatch (dataSource(e.target.value));
      
    }

    return (
      <div>
        <div>
          <h3>Search breeds by name:</h3>
          <input />
        </div>

        <div>
          <h3>Filter breeds by:</h3>
          <label>temperament</label>
          <select>
            <option value="ver">todos los temperamentos</option>
          </select>

          <br />

          <label>file source </label>
          <select onChange={handleOnChange}>
            <option value="all the breeds">All</option>
            <option value="traditionals">Traditionals</option>
            <option value="users">Created by users</option>
          </select>
        </div>

        <div>
          <h3>Sort by:</h3>
          <select>
            <option value="alphabetical">alphabetical order</option>
            <option value="weight">weight</option>
          </select>
        </div>

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
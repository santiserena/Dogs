import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { doFilters, getAllBreeds, getTemperaments, removeTemperament } from "../redux/actions";
import Pagination from "./Pagination";
import st from './Home.module.css';
import Card from './Card'


export default function Home (){

    const dispatch =useDispatch();
    const temp = useSelector ( state => state.temperaments);
    const allBreedsFiltered = useSelector (state => state.filtered);
    const temperamentsSelected = useSelector((state) => state.temperamentsSelected);
   
    
    useEffect(() => {
      dispatch(getAllBreeds());
      dispatch(getTemperaments());
    }, [dispatch]); 
    
    
    function filterOnChange (e){

      setCurrentPage (1)
      
      //just to take warning out:
      setCardsPerPage(8)

      let sending ={
        sltName:document.getElementById('byName').value,
        sltSource:document.getElementById('source').value,
        sltAlpWeight:document.getElementById('alpWeight').value,
        sltAscDes:document.getElementById('ascDes').value
      }

      if (e.target.id === 'temp' && !temperamentsSelected.includes(e.target.value)){
        dispatch (doFilters({...sending, sltTemp: e.target.value}))
      }

      else dispatch (doFilters(sending));
    }

    function removeTemp (e){
      e.preventDefault();
      dispatch (removeTemperament(e.target.value))
      filterOnChange(e)
    }
    
    /* _______________pagination_________________________ */

    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage, setCardsPerPage] = useState (8)
    const indexOfLastCard = currentPage * cardsPerPage //last card of the page
    const indexOfFirstCard = indexOfLastCard - cardsPerPage //first card of the page
    const currentCards = allBreedsFiltered.slice (indexOfFirstCard, indexOfLastCard) // current page we are seeing
    
    const pagination = (pageNumber) =>{
      setCurrentPage (pageNumber)
    }
/* _______________pagination_________________________ */


    return (

    <div>  
     { <div className={st.dw}>
        <div className={`${st.t} ${st.co}`} >

          <div>
            <h3>Search breeds by name:</h3>
            <input name='byName' id="byName" className={st.in} onChange={filterOnChange}/>
            {allBreedsFiltered?.length ? <h3 className={st.pg}>Page {currentPage} / {Math.ceil(allBreedsFiltered.length/cardsPerPage)}</h3> : null}
          </div>

          <div>
            <h3>Filter breeds by:</h3>
            
            <select id='source' className={st.in} onChange={filterOnChange}>
              <option value="all the breeds">All</option>
              <option value="traditionals">Traditionals</option>
              <option value="users">Created by users</option>
            </select>
            <label> File source </label>
            
            <br/>

            <select id= 'temp' className={st.in} onChange = {filterOnChange}>
              {temp?.map ( e => <option key = {e.id}>{e.name}</option> )} 
            </select>
            <label> Temperaments</label>
            <br/>
            {temperamentsSelected?.length ? 

              <div className = {st.na}>
                  <label className={st.l}>Click to remove:  </label>
                  {temperamentsSelected.map( e => <button key={e} value = {e} className={st.bt} onClick={removeTemp}>{e}</button>)}
              </div>
              : null}

          </div>

          <div>
            <h3>Sort by:</h3>
            <select id = 'alpWeight' className={st.in} onChange={filterOnChange}>
              <option value="alphabetical">Alphabetical order</option>
              <option value="weight">Weight</option>
            </select>

          <br/>      
            <select id = 'ascDes' className={st.in} onChange={filterOnChange}>
              <option value="Ascending">Ascending order</option>
              <option value="Descending">Descending order</option>
            </select>
          </div>
        </div>

{/* _____________________pagination______________________ */}
        <div /* className={st.dw} */>
          <div className = {st.ca}>
            {currentCards?.map( el => <Card key={el.id} data={el}/>)}
          </div>

          <div>
              <Pagination
                  cardsPerPage={cardsPerPage}
                  allBreedsFiltered={allBreedsFiltered.length}
                  pagination={pagination}
                  currentPage={currentPage}
                  />
          </div>
{/* _____________________pagination______________________ */}
           

              
        </div>
      </div> }
    </div>  
    );
}
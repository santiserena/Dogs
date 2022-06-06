import React, { useState } from "react";
import Card from "./Card";
import st from './ShowsCardsAndPagination.module.css'

export default function ShowsCardsAndPagination (props) {

    const [selectedPage, setSelectPage] = useState([]);
    let buttonsnumber = Math.ceil (props.info.length / 8)
    let arraypages = []; 

    for(let i=0; i<buttonsnumber; i++){
        arraypages.push (props.info.slice(i*8, (i*8)+8))
    }

    const show = (index) => {
        setSelectPage (arraypages[index])
    }

    return (
        <div>
            <div>
                {arraypages?.map( (e, index)  => <button key={index} onClick={(event)=> show(index) }>{index}</button>)}
            </div>

            <div className={st.ca}>
                { !selectedPage.length ? 
                props.info.slice(0,8).map ( e => <Card key={e.id} data={e}/>) 
                : selectedPage?.map((e) => <Card key={e.id} data={e}/>)}
            </div>
        </div>
          )
}
import React from "react";

export default function ShowsCardsAndPagination ({cardsPerPage, allBreedsFiltered, pagination, currentPage}){
    const pageNumber = []
    
    for (let i = 0; i < Math.ceil(allBreedsFiltered/cardsPerPage) ; i++) {
        pageNumber.push(i+1)
    }

    const next = () =>{
        if(currentPage+1 <= pageNumber.length) pagination(currentPage+1)
    }
    const previous = () =>{
        if(currentPage-1 >= 1) pagination(currentPage-1)
    }
    
    return (
        <div>

            {pageNumber.length ? <div><h1>page:{currentPage} of {pageNumber.length}</h1></div> : null}

        {pageNumber?.length !== 0 && pageNumber?.length !== 1 ? <div>
            <button onClick={()=>previous()}>Previous Page</button>
            <button onClick={()=>next()}>Next Page</button>
            <br/>
            {pageNumber && pageNumber?.map( el => <button key={el} onClick={()=>pagination(el)}>{el}</button>)}
        </div> : null}
        
        </div>
    )
} 
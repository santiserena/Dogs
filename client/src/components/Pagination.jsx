import React from "react";
import st from './Pagination.module.css'

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
      <div className={st.all}>

        <div className={st.pageNum}>
          {pageNumber.length ? (
            <div>
              <span>
                Page: {currentPage} of {pageNumber.length}
              </span>
            </div>
          ) : <div className={st.noConcidenses}><p>There are no concidenses</p></div>}
        </div>  

        <div>
          {pageNumber?.length !== 0 && pageNumber?.length !== 1 ? (
            <div className={st.bu}>
              <div className = {st.prevNext}>
                <button className={st.b} onClick={() => previous()}>Prev</button>
                <button className={st.b} onClick={() => next()}>Next</button>
              </div>
            </div>
          ) : null}
        </div>

        <div>
          {pageNumber?.length !== 0 && pageNumber?.length !== 1 ? (
              <div className={st.butNumb}>
                
                {pageNumber &&
                  pageNumber?.map((el) => (
                    <button key={el} className = {st.oneBu} onClick={() => pagination(el)}>{el}</button>
                    ))}
              </div>
          ) : null}
        </div>
        
      </div>
    );
} 
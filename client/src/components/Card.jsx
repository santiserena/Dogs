import React from "react";
import { Link } from "react-router-dom";
import footprints from "../images/footprints.jpg";
import st from './Card.module.css'

export default function Card({data}) {

  return (
    <div className={st.c}>
        <div>
          {data.image ? (
            <img src={data.image} className={st.im} alt="not found" />
            ) : (
              <img src={footprints} className={st.im} alt="not found" />
              )}
        </div> 

        <div className={st.inf}>
          <h4>{data.name}</h4>
          <p>Average weight: {(data.weight[0] + data.weight[1]) / 2}</p>
          {data.temperament ? <p>Temperaments: {data.temperament?.join(", ")}</p> : null}
          <Link to={`/breed/${data.id}`}><button>Details</button></Link>
        </div>
       
    </div>
  );
}

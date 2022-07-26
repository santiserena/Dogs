import React from "react";
import footprints from "../images/footprints.jpg";
import st from './Card.module.css'

export default function Card({data}) {

  return (
    <div className={st.c}>
      <div>
        <div className={st.imgBox}>
          {data.image ? (
            <img src={data.image} className={st.im} alt="not found" />
          ) : (
            <img src={footprints} className={st.im} alt="not found" />
          )}
        </div>
      </div>

        <div className={st.tittle}>
          <h3 style={{margin: '0px'}} >{data.name}</h3>
        </div>

      <div className={st.inf}>
        <p className={st.p} style={{margin: '0px'}}>Average weight: {(data.weight[0] + data.weight[1]) / 2}</p>
        <p className={st.p} style={{margin: '0px'}}>Average Height: {(data.height[0] + data.height[1]) / 2}</p>
        {/* {data.temperament ? (
          <p>Temperaments: {data.temperament?.join(", ")}</p>
        ) : null} */}
      </div>
    </div>
  );
}

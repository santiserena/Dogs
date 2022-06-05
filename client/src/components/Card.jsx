import React from "react";
import { Link } from "react-router-dom";
import footprints from "../images/footprints.jpg";

export default function Card({data}) {

  return (
    <div>
      <hr />
      <h4>{data.name}</h4>
      <p>Average weight: {(data.weight[0] + data.weight[1]) / 2}</p>
      {data.temperament ? <p>Temperaments: {data.temperament?.join(", ")}</p> : null}
      <Link to={`/breed/${data.id}`}><button>Details</button></Link>
   <br/>     
     
      {data.image ? (
            <img src={data.image} width="193" height="130" alt="not found" />
          ) : (
            <img src={footprints} width="193" height="130" alt="not found" />
          )}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import footprints from "../images/footprints.jpg";

export default function Card({ name, weight, temperament, image, id }) {
  return (
    <div>
      <hr />
      <h4>{name}</h4>
      <p>Average weight: {(weight[0] + weight[1]) / 2}</p>
      {temperament ? <p>Temperaments: {temperament?.join(", ")}</p> : null}
      <Link to={`/breed/${id}`}><button>Details</button></Link>
   <br/>       
      {image ? (
            <img src={image} width="193" height="130" alt="not found" />
          ) : (
            <img src={footprints} width="193" height="130" alt="not found" />
          )}
    </div>
  );
}

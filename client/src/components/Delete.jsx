import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import st from "./Delete.module.css";
import footprints from "../images/footprints.jpg";

export default function Delete() {
  const [myState, setMyState] = useState([]);

  useEffect(() => {
    getDb();
    return () => {
      setMyState({});
    };
  }, []);

  function getDb() {
    axios
      .get(`http://localhost:3001/dogs`)
      .then((result) =>
        setMyState(result.data.filter((el) => typeof el.id !== "number"))
      )
      .catch((e) => console.log(e));
  }

  function deleteBreed(id) {
    axios
      .delete(`http://localhost:3001/erase/${id}`)
      .then(() => getDb())
      .catch((e) => console.log(e));
    alert("The content was successfully deleted");
  }

  return (
    <div className={st.all}>
      <div>
        <Link to="/home">
          <button className={st.bu}>Go back home</button>
        </Link>
      </div>
      <div className={st.tittle}>
        <h1>Delete user breed</h1>
      </div>
      <h5 className={st.tittle2}>
        Remember that once the content is deleted, it will be unrecoverable.
      </h5>

      {myState?.map((el) => (
        <div className={st.smallCard} key={el.id}>
          <div className={st.nameAndBt}>
            <h3 className={st.breedName}>{el.name}</h3>
            <button className={st.bu2} onClick={() => deleteBreed(el.id)}>
              {" "}
              Delete{" "}
            </button>
          </div>

          <div className={st.info}>
            <p>
              Weight: {el.weight[0]} - {el.weight[1]}
            </p>
            <p>
              Height: {el.height[0]} - {el.height[1]}
            </p>
            <p>Life span: {el.lifeSpan}</p>
          </div>

          <div>
            {el.image ? (
              <img className={st.image} src={el.image} alt="Not found" />
            ) : (
              <img className={st.image} src={footprints} alt="not found" />
            )}
          </div>
        </div>
      ))}
      {!myState?.length && <h1>There is nothing to erase</h1>}
    </div>
  );
}

import React from "react";
import Card from "./Card";

export default function (props) {
    

    return (
        <div>
            <h1>mustro crds</h1>

            { props.info.map((e) => <Card
                key={e.id}
                id={e.id}
                name={e.name}
                height={e.height}
                weight={e.weight}
                image={e.image}
                temperament={e.temperament}
            />)  }
        </div>
          )
}
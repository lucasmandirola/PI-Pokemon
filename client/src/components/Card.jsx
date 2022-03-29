import React from 'react';
import { Link } from "react-router-dom";

export default function Card({id, image, name, types}){
  return(
      <div>
          <img src= {image} alt= 'img not found' width= '200px' height='250px'/>
          <Link to={'/details/' + id}>
              <h3 >{name.toUpperCase()}</h3>
          </Link>
          {types?.map((t) => (
        <span key={t}>
          {" "}
          {t.toUpperCase()}
        </span>
      ))}
      </div>
  )
}
import React from "react";


export default function Paginado({pokesPerPage, allPokes, paginado}){
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(allPokes/pokesPerPage); i++){
    pageNumbers.push(i)
  }
  return (
    <nav>
      <ul>
        {pageNumbers &&
        pageNumbers.map(number => (
					<li key={number}>
          <a onClick={() => paginado(number)}>{number}</a>
					</li>
        ))}
      </ul>
    </nav>
  )
}
import React, { useState } from "react";



export default function Paginado({currentPage, setCurrentPage, pokesPerPage, allPokes, paginado}){
  const [input, setInput] = useState(1)
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(allPokes/pokesPerPage); i++){
    pageNumbers.push(i)
  }

  const max = allPokes/pokesPerPage

  function prevPage(){
    setInput(parseInt(input) - 1)
    setCurrentPage(parseInt(input) - 1)
  }

  function nextPage(){
    setInput(parseInt(input) + 1)
    setCurrentPage(parseInt(input) + 1)
  }

  return (
    <div>
      <button disabled={currentPage === 1 || currentPage < 1} onClick={prevPage}>{'<'}</button>
      {pageNumbers &&
      pageNumbers.map(number => (
        <button key={number} onClick={() => paginado(number)} className={currentPage === number ? 'pagActive' : 'pagDesactive'}>{number}</button>
      ))}
      <button disabled={currentPage === Math.ceil(max) || currentPage > Math.ceil(max)} onClick={nextPage}>{'>'}</button>
    </div>
  )
}
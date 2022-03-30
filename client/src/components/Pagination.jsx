import React, { useState } from "react";
import style from './Pagination.module.css'



export default function Paginado({currentPage, setCurrentPage, pokesPerPage, allPokes, paginado}){
  const [input, setInput] = useState(currentPage)
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(allPokes/pokesPerPage); i++){
    pageNumbers.push(i)
  }

  const max = allPokes/pokesPerPage

  function prevPage(){
    setInput(input - 1)
    setCurrentPage(input - 1)
  }

  function nextPage(){
    setInput(input + 1)
    setCurrentPage(input + 1)
  }

  return (
    <div className={style.container}>
      <button className={style.flechas} disabled={currentPage === 1 || currentPage < 1} onClick={prevPage}>{'<'}</button>
      {pageNumbers &&
      pageNumbers.map(number => (
        <button key={number} onClick={() => paginado(number)} className={currentPage === number ? style.pagActive : style.pagDesactive}>{number}</button>
      ))}
      <button className={style.flechas} disabled={currentPage === Math.ceil(max) || currentPage > Math.ceil(max)} onClick={nextPage}>{'>'}</button>
    </div>
  )
}
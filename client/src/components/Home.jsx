import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, filterPokesByType, getTypes, filterByCreate, orderByName, orderByAttack, cleanDetail } from "../redux/actions";
import {Link} from 'react-router-dom'
import Card from "./Card";
import Paginado from "./Pagination";

export default function Home(){
  const dispatch = useDispatch();

	const allPokes = useSelector((state) => state.pokemons);
	const types = useSelector((state) => state.types);
	const [orden, setOrden] = useState('')

	// Paginado
	const [currentPage, setCurrentPage] = useState(1);
	const [pokesPerPage, setPokesPerPage] = useState(12);
	const indexOfLastPoke = currentPage * pokesPerPage;
	const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
	const currentPokes = allPokes.slice(indexOfFirstPoke, indexOfLastPoke);
	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	useEffect(() => {
		dispatch(getPokemons())
		dispatch(getTypes())
		dispatch(cleanDetail())
	}, [dispatch]) 

	function handleClick(e){
		e.preventDefault()
		dispatch(getPokemons())
	}

	function handleFilterType(e){
		e.preventDefault()
		dispatch(filterPokesByType(e.target.value))
		setCurrentPage(1)
	}

	function handleFilterCreate(e){
		e.preventDefault()
		dispatch(filterByCreate(e.target.value))
		setCurrentPage(1)
	}

	function handleOrderByName(e){
		e.preventDefault()
		dispatch(orderByName(e.target.value))
		setCurrentPage(1)
		setOrden(`Ordenado ${e.target.value}`)
	}

	function handleOrderByName(e){
		e.preventDefault()
		dispatch(orderByAttack(e.target.value))
		setCurrentPage(1)
		setOrden(`Ordenado ${e.target.value}`)
	}

	return (
		<div>
			<div>
				<Link to='/pokemons'>Crear Pokemon</Link>
				<h1>PokeApp</h1>
				<button onClick={ e => {handleClick(e)} }>Volver a cargar los pokemons</button>
			</div>

			<div>
				<select onChange={(e) => handleOrderByName(e)}>
					<option value= "all">Ordenar por Nombre</option>
					<option value="asc">A-Z</option>
					<option value="des">Z-A</option>
				</select>

				<select onChange={(e) => handleOrderByName(e)}>
					<option value= "all">Ordenar por Fuerza</option>
					<option value="asc">Más fuerte</option>
					<option value="des">Menos fuerte</option>
				</select>

				<select onChange={(e) => handleFilterType(e)}>
					<option value='all'>Tipos</option>
					{types?.map((e) => (
						<option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>
					))}
				</select>

				<select onChange={(e) => handleFilterCreate(e)}>
					<option value= 'all'>Origen</option>
					<option value="api">Existentes</option>
					<option value="createdInDb">Creados</option>
				</select>

				<Paginado
				pokesPerPage={pokesPerPage}
				allPokes={allPokes.length}
				paginado={paginado}
				/>

				<div>
          {
            allPokes.length ?
            currentPokes?.map(el=>{
              return(
                  <Card key={el.id} id={el.id} name={el.name} types={el.types} image={el.image}/>
              )
            }) : <div><h1>No se han encontrado pokemones</h1></div>
          }
        </div>
			</div>
		</div>
	)
}
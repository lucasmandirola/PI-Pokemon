import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cleanDetail, getDetail } from "../redux/actions";



export default function Details(props){
  const dispatch = useDispatch()
	const { id } = useParams()

  useEffect(() => {
		dispatch(cleanDetail)
		dispatch(getDetail(id))
	}, [id, dispatch])

	const poke = useSelector((state) => state.details)
	// console.log(poke.name)

	function handleClick(e){
		dispatch(cleanDetail())
	}

	return(
		<div>
			<Link to='/home'>
				<button onClick={() => handleClick()}>Volver</button>
			</Link>
			{poke.length < 0 ? <p>Cargando...</p> :
        <div>
          <div><h1>{poke.name}</h1> </div>
        	<div >
          	<img src={poke.image} alt={poke.name} width='300px' height='375px' />
          	<div >
          	<h3 >Tipos: {poke.types?.map((e)=>(
          	  <span key={e}>{e}{" / "}</span>
          	))}
						</h3>
          	<h5>ID: {poke.id}</h5>
          	<h5>Vida: {poke.hp}</h5>
          	<h5>Fuerza: {poke.attack}</h5>
          	<h5>Defensa: {poke.defense}</h5>
          	<h5>Velocidad: {poke.speed}</h5>
          	<h5>Altura: {poke.height}</h5>
          	<h5>Peso: {poke.weight}</h5>
          	</div>
        	</div> 

        </div>
      }
		</div>
	)
}
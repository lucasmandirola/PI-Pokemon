import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cleanDetail, getDetail } from "../redux/actions";
import style from './Details.module.css';



export default function Details(props){
  const dispatch = useDispatch()
	const { id } = useParams()
	const detail = useSelector((state) => state.details)

  useEffect(() => {
		dispatch(cleanDetail)
		dispatch(getDetail(id))
	}, [id, dispatch])

	const poke = useSelector((state) => state.details)
	// console.log(poke.name)

	function handleClick(e){
		dispatch(cleanDetail())
		console.log(detail)
	}

	return(
		<div className={style.details}>
			<Link to='/home'>
				<button onClick={() => handleClick()} className={style.button}>Volver</button>
			</Link>
			<div className={style.pokeDetail}>
			{poke.length < 0 ? <p className={style.loading}>Cargando...</p> :
        <div>
          <div><h1 className={style.name}>{poke.name}</h1> </div>
        	<div >
          	<img className={style.image} src={poke.image} alt={poke.name} width='200px' height='250px' />
          	<div >
          		<h3 className={style.types}>Tipos: {poke.types?.map((e)=>(
          		  <span key={e}> 👉{e}</span>
          		))}
							</h3>
							<div className={style.stats}>
								<label>ID: </label> <span className={style.statsNumber}>{poke.id}</span><br/>
								<div className={style.leftStats}>
									<div>
           					<label>Vida: </label> <span className={style.statsNumber}>{poke.hp}</span><br/>
          					<label>Fuerza: </label> <span className={style.statsNumber}>{poke.attack}</span><br/>
          					<label>Defensa: </label> <span className={style.statsNumber}>{poke.defense}</span><br/>
									</div>
								</div>
								<div className={style.rightStats}>
          				<label>Velocidad: </label><span className={style.statsNumber}>{poke.speed}</span><br/>
          				<label>Altura: </label><span className={style.statsNumber}>{poke.height}</span><br/>
          				<label>Peso: </label><span className={style.statsNumber}>{poke.weight}</span>
								</div>
          		</div>
						</div>
        	</div> 

        </div>
      }
			</div>
		</div>
	)
}
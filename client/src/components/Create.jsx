import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postPokemon, getTypes } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function validate(input){
	let errors = {}
	if(!input.name || input.name.length > 20 || !/[A-Za-z]/i.test(input.name)) errors.name = 'El campo "nombre" es obligatorio, solo debe contener letras y debe tener menos de 20 caracteres'
	if(input.hp > 200 || input.hp < 0) errors.hp = 'El campo "vida" es obligatorio y debe tener en 0 y 200 puntos'
	if(input.attack > 200 || input.attack < 0) errors.attack = 'El campo "fuerza" es obligatorio y debe tener en 0 y 200 puntos'
	if(input.defense > 200 || input.defense < 0) errors.defense = 'El campo "defensa" es obligatorio y debe tener en 0 y 200 puntos'
	if(input.speed > 200 || input.speed < 0) errors.speed = 'El campo "velocidad" es obligatorio y debe tener en 0 y 200 puntos'
	if(input.height > 200 || input.height < 0) errors.height = 'El campo "altura" es obligatorio y debe tener en 0 y 200 puntos'
	if(input.weight > 200 || input.weight < 0) errors.weight = 'El campo "peso" es obligatorio y debe tener en 0 y 200 puntos'
	if(input.types.length > 2 || !input.types.length) errors.types = 'El campo "tipos" es obligatorio y pueden ser máximo 2'
	return errors
}


export default function CreatePokemon(){
  const dispatch = useDispatch()
	// const allPokes = useSelector((state) => state.allPokemons)
  const types = useSelector((state) => state.types)
	const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: []
  })

	useEffect(() => {
	  dispatch(getTypes())
	}, [dispatch])



	function handleChange(e){
		setInput({
			...input,
			[e.target.name] : e.target.value.toLowerCase()
		})
		setErrors(validate({
			...input,
			[e.target.name]: e.target.value
		}))
	}

	function handleSelect(e){
		setInput({
			...input,
			types: [...input.types, e.target.value]
		})
	}

	function handleSubmit(e){
		e.preventDefault()
		// allPokes.map(p => {
		// 	if(p.name === input.name) return alert('Ya existe un pokemon con ese nombre')
		// })
		if(errors.name || errors.hp || errors.attack || errors.defense || errors.speed || errors.height || errors.weight) return alert('Revisar errores en el formulario')
		else {
		dispatch(postPokemon(input))
		alert('Felicitaciones! Tu pokemon se creo correctamente')
		setInput({
			name: '',
			image: '',
			hp: '',
			attack: '',
			defense: '',
			speed: '',
			height: '',
			weight: '',
			types: []
		})
	  }
	}

	function handleDelete(el){
		setInput({
			...input,
			types: input.types.filter(t => t !== el)
		})
	}

  return (
    <div>
      <Link to='/home'><button>Volver</button></Link>
      <h1>Crea tu propio Pokemon!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
						<label>Nombre: </label>
						<input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)}/>
						<p>{errors.name}</p>
					</div>

        	<div>
						<label>Vida: </label>
						<input type='number' value={input.hp} name='hp' onChange={(e) => handleChange(e)}/>
						<p>{errors.hp}</p>
					</div>

        	<div>
						<label>Fuerza: </label>
						<input type='number' value={input.attack} name='attack' onChange={(e) => handleChange(e)}/>
						<p>{errors.attack}</p>
					</div>

        	<div>
						<label>Defensa: </label>
						<input type='number' value={input.defense} name='defense' onChange={(e) => handleChange(e)}/>
						<p>{errors.defense}</p>
					</div>

        	<div>
						<label>Velocidad: </label>
						<input type='number' value={input.speed} name='speed' onChange={(e) => handleChange(e)}/>
						<p>{errors.speed}</p>
					</div>

        	<div>
						<label>Altura: </label>
						<input type='number' value={input.height} name='height' onChange={(e) => handleChange(e)}/>
						<p>{errors.height}</p>
					</div>

        	<div>
						<label>Peso: </label>
						<input type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)}/>
						<p>{errors.weight}</p>
					</div>

        	<div>
						<label>URL de la imagen: </label>
						<input type='url' value={input.image} name='image' onChange={(e) => handleChange(e)}/>
					</div>

					<div><label>Tipos: </label>
						<select onChange={(e) => handleSelect(e)}>
							{types?.map((e) => (
								<option key={e} value={e}>{e}</option>
							))}
						</select>
						<p>{errors.types}</p>
					</div>
					{input.types.map((e) => (
						<div key={e}>
							<label >{e}</label><button onClick={() => handleDelete(e)}>x</button>
						</div>
					))}

					<button type='submit'>Crear pokemon</button>
      	</div>
      </form>

    </div>
    )
}
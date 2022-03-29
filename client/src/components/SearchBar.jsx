import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../redux/actions";

export default function SearchBar(){
  	const dispatch = useDispatch()
	const [name, setName] = useState('')

	function handleInputChange(e){
		e.preventDefault()
		setName(e.target.value)
	}

	function handleSubmit(e){
		e.preventDefault()
		if(name){
		dispatch(getName(name.toLowerCase()))
		}
		setName('')
	}

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
			<input type='text' placeholder="Buscar por nombre..." onChange={(e) => handleInputChange(e)}/>
			<button type='submit' >Buscar</button>
			</form>
		</div>
	)
}
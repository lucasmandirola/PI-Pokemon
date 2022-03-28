import { GET_POKEMONS, GET_NAMES, GET_DETAILS, GET_TYPES, CLEAN_DETAIL, POST_POKEMONS, FILTER_CREATION, FILTER_TYPES, ORDER_BY_ATTACK, ORDER_BY_NAME, DELETE_POKEMON } from "../actions";




const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  details: []
}


function rootReducer (state = initialState, action){
	switch(action.type){

		case GET_POKEMONS:
			return {
				...state,
				pokemons: action.payload,
				allPokemons: action.payload
			}

		case GET_TYPES:
			return{
				...state,
				types: action.payload
			}

		case FILTER_TYPES:
			const allPokes = state.allPokemons
			const typesFilter = action.payload === 'all' 
			? allPokes 
			: allPokes.filter(p => p.types?.includes(action.payload))
			return {
				...state,
				pokemons: typesFilter
			}

		case FILTER_CREATION:
			const allPokemonsOrigen = state.allPokemons;
      const createdFilter = action.payload === "createdInDb" ? allPokemonsOrigen.filter((e) => e.createdInDb) : allPokemonsOrigen.filter((e) => !e.createdInDb)
      return {
        ...state,
        pokemons: createdFilter,
      };
		
		case ORDER_BY_NAME:
			const sortedArr = action.payload === 'all'
			? state.pokemons 
			:	action.payload === 'asc'
			? state.pokemons.sort((a, b) => a.name.localeCompare(b.name)) 
			: state.pokemons.sort((a, b) => b.name.localeCompare(a.name))
			return {
				...state,
				pokemons: sortedArr
			}

		case ORDER_BY_ATTACK:
			const sort = action.payload === 'all'
			? state.pokemons 
			:	action.payload === 'des'
			? state.pokemons.sort((a, b) => a.attack - b.attack) 
			: state.pokemons.sort((a, b) => b.attack - a.attack)
			return {
				...state,
				pokemons: sort
			}
		
		case CLEAN_DETAIL:
      return {
      	...state,
      	detail: {},
    };

		default:
			return state
	}
}

export default rootReducer;
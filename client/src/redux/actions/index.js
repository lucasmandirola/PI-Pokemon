import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS";
// export const GET_NAMES = "GET_NAMES";
// export const GET_DETAILS = "GET_DETAILS";
export const GET_TYPES = "GET_TYPES";
// export const POST_POKEMONS = "POST_POKEMONS";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_CREATION = "FILTER_CREATION";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
// export const DELETE_POKEMON = "DELETE_POKEMON";
export const CLEAN_DETAIL = "CLEAN_DETAIL"
const URLBack = 'http://localhost:3001'


export function getPokemons() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${URLBack}/pokemons`);
      return dispatch({
        type: GET_POKEMONS,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getTypes(){
  return async function(dispatch){
    try {
      const json = await axios.get(`${URLBack}/types`);
      return dispatch({
        type: GET_TYPES,
        payload: json.data
      })
    }
    catch(err) {
      console.log(err)
    }
  }
}

export function filterPokesByType(payload){
  return {
    type: FILTER_TYPES,
    payload
  }
}

export function filterByCreate(payload){
  return {
    type: FILTER_CREATION,
    payload
  }
}

export function orderByName(payload){
  return {
    type: ORDER_BY_NAME,
    payload
  }
}

export function orderByAttack(payload){
  return {
    type: ORDER_BY_ATTACK,
    payload
  }
}

export function cleanDetail() {
  return {
    type: CLEAN_DETAIL,
    payload: {},
  };
}

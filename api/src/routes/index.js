const { Router } = require('express');
const axios = require("axios");
const { Pokemon, Types } = require("../db");
const db = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const apiInfo = async () => {
  let arrPokemons = []; 
  let arrDataPoke = [];
  let urlApi = `https://pokeapi.co/api/v2/pokemon`;
  try {
    for (let i = 0; i < 2; i++) {
      const urlData = await axios.get(urlApi);
      urlData.data.results.map((e) => {
        arrPokemons.push({
          url: e.url,
        });
      });
      urlApi = urlData.data.next;
    }
    const arrData = arrPokemons.map(async (el) => await axios.get(el.url));
    let infoLista = await Promise.all(arrData).then((e) => {
      const pokes = e.map((e) => e.data);
      pokes.map((p) => {
        arrDataPoke.push({
          id: p.id,
          name: p.name,
          hp: p.stats[0].base_stat,
          attack: p.stats[1].base_stat,
          defense: p.stats[2].base_stat,
          speed: p.stats[5].base_stat,
          height: p.height,
          weight: p.weight,
          image: p.sprites.other.home.front_default,
          types: p.types.map((t) => t.type.name)
        });
      });
      return arrDataPoke;
    });
    return infoLista;
  } catch (error) {
    console.log(error);
  }
};
const dbInfo = async () => {
  const arrInfo = await Pokemon.findAll({
    include: {
      model: Types,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const arrLista = await arrInfo.map((d) => {
    return {
      id: d.id,
      name: d.name,
      hp: d.hp,
      attack: d.attack,
      defense: d.defense,
      speed: d.speed,
      height: d.height,
      weight: d.weight,
      image: d.image,
      types: d.types.map((el) => el.name),
      createdInDb: d.createdInDb,
    };
  });
  return arrLista;
};
const allPokemons = async () => {
  const apiPokes = await apiInfo();
  const dbPokes = await dbInfo();
  const todosPokes = apiPokes.concat(dbPokes);
  return todosPokes;
};

const apiName = async (name) => {
	try{
		let urlApi = await axios.get(`https://pokeapi.co/api/v2/pokemon${name}`);
		let urlData = await urlApi.data
		urlData = [
			{
				id: urlData.id,
				name: urlData.name,
				hp: urlData.stats[0].base_stat,
				attack: urlData.stats[1].base_stat,
				defense: urlData.stats[2].base_stat,
				speed: urlData.stats[5].base_stat,
				height: urlData.height,
				weight: urlData.weight,
				image: urlData.sprites.other.home.front_default,
				types: urlData.types.map((t) => t.type.name)
			}
		]
		return urlData
	}
	catch(err){
		console.log(err)
	}
}
const nameDb = async (name) => {
  try {
    const nombreDb = await Pokemon.findAll({
      where: {
        name: name,
      },
      include: {
        model: Types,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const pokemonDb = nombreDb.map((p) => {
      return {
        id: p.id,
        name: p.name,
        types: p.types.map((e) => e.name),
        image: p.image,
        hp: p.hp,
        attack: p.attack,
        defense: p.defense,
        speed: p.speed,
        height: p.height,
        weight: p.weight,
        createdInDb: p.createdInDb,
      };
    });
    // console.log(pokemonDb);
    return pokemonDb;
  } catch (error) {
    console.log(error);
  }
};

router.get('/pokemons', async (req, res) => {
  const { name } = req.query;
  try {
    const pokes = await allPokemons()
    if(name){
      const db = await nameDb(name)
      if(!db){
        const api = await apiName(name)
        if(!api){
          return res.status(404).send('This pokemon was not found')
        }
        else{
          return res.send(api)
        }
      }
      else {
        return res.send(db)
      }
    }
    return res.send(pokes)
  }
  catch(err){
    console.log(error);
  }
})

const apiId = (id) => {
  try {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => {
      const info = res.data 
      const detail = {
        id: info.id,
				name: info.name,
				hp: info.stats[0].base_stat,
				attack: info.stats[1].base_stat,
				defense: info.stats[2].base_stat,
				speed: info.stats[5].base_stat,
				height: info.height,
				weight: info.weight,
				image: info.sprites.other.home.front_default,
				types: info.types.map((t) => t.type.name)
      }
      return detail
    })
  }
  catch(err){
    console.log(err)
  }
}

const idDb = async (id) => {
  try {
    const db = await Pokemon.findByPk(id, { include: Types });
    return {
      id: db.id,
      name: db.name,
      types: db.types.map((e) => e.name),
      image: db.image,
      hp: db.hp,
      attack: db.attack,
      defense: db.defense,
      speed: db.speed,
      height: db.height,
      weight: db.weight,
      createdInDb: db.createdInDb,
    };
  } catch (err) {
    console.log(err);
  }
};

const allId = async (id) => {
  const UUID = id.includes('-')
  if(UUID) {
    let result = await idDb(id)
    return result
  }
  else {
    let result = await apiId(id)
    return result 
  }
}

router.get('/pokemons/:id', async (req, res) => {
  const { id } = req.params;
  const poke = await allId(id)
  if(poke) return res.send(poke)
  return res.send('This pokemon was not found') 
})

const types = async () => {
  try {
    const typesDb = await Types.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    })
    if(!typesDb.length){
      const typesApi = await axios.get(`https://pokeapi.co/api/v2/type`)
      const typesName = typesApi.data.results.map(e => e.name)
      typesName.map(async (e) => 
        await Types.findOrCreate({
          where: {
            name: e
          }
        })
      )
      return typesName
    }
    else {
      return typesDb.map(e => e.name)
    }
  }
  catch(err){
    console.log(err)
  }
}

router.get('/types', async (req, res) => {
  const allTypes = await types()
  res.send(allTypes)
})

router.post("/pokemons", async (req, res) => {
  try {
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      types,
      createdInDb,
    } = req.body;
    const lowerName = name.toLowerCase()
    const lowerType = types.toLowerCase()
    const newPokemon = await Pokemon.create({
      name: lowerName,
      hp,
      image:
        image || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      attack,
      defense,
      speed,
      height,
      weight,
      createdInDb,
    });
    const typePokemon = await Types.findAll({
      where: { name: lowerType },
    });

    newPokemon.addType(typePokemon);
    return res.send(newPokemon);
  } catch (error) {
    console.log(error);
  }
});

// {
//   "name": "lucas",
//   "types": "electric",
//   "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
//   "hp": 68,
//   "attack": 98,
//   "defense": 45,
//   "speed": 89,
//   "height": 189,
//   "weight": 72,
//   "createdInDb": true
// }

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Pokemon.destroy({
        where: { id: id },
      });
    }
    return res.send({ msg: "Pokemon deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

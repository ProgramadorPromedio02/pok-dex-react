// Hook usePokemones.js

import { useEffect, useState } from "react";

const URL_DEFAULT = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
const URL_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

function usePokemones() {
  const [pokemones, setPokemons] = useState([]);
  const [siguienteUrl, setSiguienteUrl] = useState("");
  const [verMas, setVerMas] = useState(true);

  const fetchPokemon = async (url) => {
    const response = await fetch(url);
    const poke = await response.json();

    const abilities = poke.abilities.map((a) => a.ability.name);
    const stats = poke.stats.map((s) => {
      return { name: s.stat.name, base: s.base_stat };
    });
    const types = poke.types.map((t) => t.type.name);

    return {
      id: poke.id,
      nombre: poke.name,
      imagen:
        poke.sprites.other.dream_world.front_default ||
        poke.sprites.front_default,
      abilities,
      stats,
      types,
    };
  };

  const getPokemons = async (url = URL_DEFAULT) => {
    const response = await fetch(url);
    const listaPokemons = await response.json();
    const { next, results } = listaPokemons;

    const newPokemons = await Promise.all(
      results.map((pokemon) => fetchPokemon(pokemon.url))
    );

    return { next, newPokemons };
  };

  const obtenerPokemons = async () => {
    const { next, newPokemons } = await getPokemons();
    setPokemons(newPokemons);
    setSiguienteUrl(next);
  };

  const masPokemons = async () => {
    if (pokemones.length >= 807) {
      return;
    }

    const { next, newPokemons } = await getPokemons(siguienteUrl);
    const totalPokemones = [...pokemones, ...newPokemons];
    const pokemonesToShow = totalPokemones.slice(0, 807);

    setPokemons(pokemonesToShow);
    setSiguienteUrl(next);

    if (pokemonesToShow.length >= 807) {
      setVerMas(false);
    }
  };

  const searchPokemon = async (busqueda) => {
    const url = `${URL_ENDPOINT}${busqueda.toLocaleLowerCase()}`;
    return await fetchPokemon(url);
  };

  useEffect(() => {
    obtenerPokemons();
  }, []);

  return { pokemones, masPokemons, verMas, searchPokemon };
}

export default usePokemones;

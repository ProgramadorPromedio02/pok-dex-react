import { useEffect, useState } from "react";

const URL_DEFAULT = "https://pokeapi.co/api/v2/pokemon?limit=&offset=0";

function usePokemones() {
  const [pokemones, setPokemons] = useState([]);
  const [siguienteUrl, setSiguienteUrl] = useState("");
  const [verMas, setVerMas] = useState(true); // Define verMas aquí

  const getPokemons = async (url = URL_DEFAULT) => {
    // Recuperamos el listado de los pokemon.
    const response = await fetch(url);
    const listaPokemons = await response.json();
    const { next, results } = listaPokemons;

    // Ahora por cada result (pokemon), necesitamos obtener la información.
    // Necesitamos esperar a que se resuelvan todas, por eso recurrimos al Promise.all.
    const newPokemons = await Promise.all(
      results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
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
      })
    );

    return { next, newPokemons };
  };

  const obtenerPokemons = async () => {
    const { next, newPokemons } = await getPokemons();
    setPokemons(newPokemons);
    setSiguienteUrl(next);
  };

  const masPokemons = async () => {
    const { next, newPokemons } = await getPokemons(siguienteUrl);
    setPokemons((prev) => [...prev, ...newPokemons]);
    next === null && setVerMas(false);
    setSiguienteUrl(next);
  };

  useEffect(() => {
    obtenerPokemons();
  }, []);

  // Retorna el estado de los pokemones y masPokemones en lugar de los Pokemones
  return { pokemones, masPokemons, verMas }; // Devuelve verMas
}

export default usePokemones;

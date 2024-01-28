//COMPONENTE Pokemones.jsx

import { useEffect, useState } from "react";
import "../styles/Pokemones.css";

function Pokemon({ id, nombre, imagen }) {
  return (
    <div className="pokemon-card">
      <img src={imagen} alt={nombre} className="pokemon-imagen" />
      <p className="pokemon-titulo">
        <span>#{id}&nbsp;</span>
        <span>{nombre}</span>
      </p>
    </div>
  );
}

function Pokemones() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      // Recuperamos el listado de los pokemon
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
      );
      const listaPokemons = await response.json();
      const { results } = listaPokemons;

      // Utilizamos Promise.all para esperar a que todas las promesas se resuelvan
      const newPokemons = await Promise.all(
        results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const poke = await response.json(); // Asegúrate de esperar aquí también
          return {
            id: poke.id,
            nombre: poke.name,
            imagen: poke.sprites.other.dream_world.front_default,
          }; // Devolvemos el objeto pokemon resuelto
        })
      );

      setPokemons(newPokemons);
    };

    getPokemons();
  }, []);

  return (
    <section className="pokemon-container">
      {pokemons.map((pokemon) => (
        <Pokemon key={pokemon.id} {...pokemon} />
      ))}
    </section>
  );
}

export default Pokemones;

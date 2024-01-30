//COMPONENTE Pokemones.jsx

import usePokemones from "../hooks/usePokemones";
import InfiniteScroll from "react-infinite-scroll-component";
import "../styles/Pokemones.css";
import "../styles/Buscador.css";
import Cargando from "./Cargando";
import DetallePokemon from "./DetallePokemon";
import { useState } from "react";

function Pokemon({ id, nombre, imagen, verPokemon }) {
  return (
    <div className="pokemon-card" onClick={verPokemon}>
      <img src={imagen} alt={nombre} className="pokemon-imagen" />
      <p className="pokemon-titulo">
        <span>#{id}&nbsp;</span>
        <span>{nombre}</span>
      </p>
    </div>
  );
}

function Pokemones() {
  const { pokemones, masPokemons, verMas } = usePokemones();
  const [mostrar, setMostrar] = useState({ mostrar: false, pokemon: {} });

  const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon });

  const noVerPokemon = () => setMostrar({ mostrar: false, pokemon: {} });

  return (
    <>
      <DetallePokemon {...mostrar} cerrar={noVerPokemon} />
      <InfiniteScroll
        dataLength={pokemones.length}
        next={masPokemons}
        hasMore={verMas}
        loader={<Cargando />}
        endMessage={
          <h3 className="titulo" style={{ gridColumn: "1/6" }}>
            Lo siento, no hay más pokémon por mostrar
          </h3>
        }
        className="pokemon-container"
      >
        {pokemones.map((pokemon) => (
          <Pokemon
            key={pokemon.id}
            {...pokemon}
            verPokemon={() => verPokemon(pokemon)}
          />
        ))}
      </InfiniteScroll>
    </>
  );
}

export default Pokemones;

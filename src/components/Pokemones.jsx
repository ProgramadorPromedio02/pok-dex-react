//COMPONENTE Pokemones.jsx

import usePokemones from "../hooks/usePokemones";
import InfiniteScroll from "react-infinite-scroll-component";
import "../styles/Pokemones.css";
import "../styles/Buscador.css";
import Cargando from "./Cargando";

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
  const { pokemones, masPokemons, verMas } = usePokemones(); // Incluye verMas aquí

  return (
    <InfiniteScroll
      dataLength={pokemones.length}
      next={masPokemons}
      hasMore={verMas} // Utiliza verMas aquí
      loader={<Cargando />}
      endMessage={
        <h3 className="titulo" style={{ gridColumn: "1/6" }}>
          Lo siento, no hay más pokémon por mostrar
        </h3>
      }
      className="pokemon-container"
    >
      {pokemones.map((pokemon) => (
        <Pokemon key={pokemon.id} {...pokemon} />
      ))}
    </InfiniteScroll>
  );
}

export default Pokemones;

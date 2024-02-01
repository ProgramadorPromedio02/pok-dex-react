//COMPONENTE Pokemones.jsx

import usePokemones from "../hooks/usePokemones";
import InfiniteScroll from "react-infinite-scroll-component";
import "../styles/Pokemones.css";
import "../styles/Buscador.css";
import Cargando from "./Cargando";
import DetallePokemon from "./DetallePokemon";
import Buscador from "./Buscador";
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
  const { pokemones, masPokemons, verMas, searchPokemon } = usePokemones();
  const [mostrar, setMostrar] = useState({ mostrar: false, pokemon: {} });
  const [busqueda, setBusqueda] = useState("");

  const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon });

  const noVerPokemon = () => {
    setMostrar({ mostrar: false, pokemon: {} });
    setBusqueda("");
  };

  const buscarPokemon = async (e) => {
    e.preventDefault();

    if (!busqueda) return;

    const pokemon = await searchPokemon(busqueda);

    // Filtrar los Pokémon con ID mayor a 807
    if (pokemon.id > 807) {
      alert("No puedes buscar Pokémon con ID mayor a 807.");
      return;
    }

    // Corregir la actualización del estado mostrar
    setMostrar({ mostrar: true, pokemon: pokemon });
  };

  return (
    <>
      <DetallePokemon {...mostrar} cerrar={noVerPokemon} />
      <Buscador
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        buscarPokemon={buscarPokemon}
      />
      <InfiniteScroll
        dataLength={pokemones.length}
        next={masPokemons}
        hasMore={verMas}
        loader={<Cargando />}
        endMessage={
          <h3 className="titulo">Lo siento, no hay más pokémon por mostrar</h3>
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

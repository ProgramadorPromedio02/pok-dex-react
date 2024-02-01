// COMPONENTE Buscador

import "../styles/Buscador.css";
import { Buscar } from "./Icons";

function Buscador({ busqueda, setBusqueda, buscarPokemon }) {
  return (
    <>
      <h3 className="titulo">Más de 800 pokemon, elige tu favorito</h3>
      <form className="container-buscar" onSubmit={buscarPokemon}>
        <input
          type="text"
          placeholder="Encuentra tu pokémon"
          className="input-buscar"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="btn-buscar" type="submit">
          <Buscar />
          Buscar pokémon
        </button>
      </form>
    </>
  );
}

export default Buscador;

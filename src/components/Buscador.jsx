// COMPONENTE Buscador

import "../styles/Buscador.css";
import { Buscar } from "./Icons";

function Buscador() {
  return (
    <>
      <h3 className="titulo">Más de 800 pokemon, elige tu favorito</h3>
      <section className="container-buscar">
        <input
          type="text"
          placeholder="Encuentra tu pokémon"
          className="input-buscar"
        />
        <button className="btn-buscar">
          <Buscar />
          Buscar pokémon
        </button>
      </section>
    </>
  );
}

export default Buscador;

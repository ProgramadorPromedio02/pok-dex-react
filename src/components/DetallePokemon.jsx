//COMPONENTE DetallePokemon.jsx

import "../styles/DetallePokemon.css";

function DetallePokemon({ mostrar, pokemon, cerrar }) {
  return (
    <div
      className="modal-container"
      onClick={cerrar}
      style={{ display: mostrar ? "grid" : "none" }}
    >
      <section className="modal-body">
        <div className="imagen-container">
          <img
            src={pokemon.imagen}
            alt={pokemon.nombre}
            className="imagen-detalle"
          />
          <section className="tags-container">
            {pokemon.types?.map((type, index) => (
              <span key={index} className="tag">
                {type}
              </span>
            ))}
          </section>
        </div>
        <div className="data">
          <h2 className="titulo">
            {pokemon.nombre} [{pokemon.id}]{" "}
          </h2>
          <h3 className="titulo-seccion">Habilidades</h3>
          <div className="abilities-container">
            {pokemon.abilities?.map((ability, index) => (
              <span key={index} className="tag">
                {ability}
              </span>
            ))}
          </div>
          <h3 className="titulo-seccion">Estadísticas</h3>
          <div className="stats">
            {pokemon.stats?.map((stat, index) => (
              <div key={index} className="stat">
                <span className="stat-name">{stat.name}</span>
                <span className="puntos">{stat.base}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetallePokemon;

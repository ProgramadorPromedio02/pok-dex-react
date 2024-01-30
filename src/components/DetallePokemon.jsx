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
          <section>
            {pokemon.types?.map(
              (
                type,
                index // Agrega el parámetro index
              ) => (
                <span key={index} className="tag">
                  {type}
                </span> // Usa index como key
              )
            )}
          </section>
        </div>
        <div className="data">
          <h2 className="titulo">
            {pokemon.nombre} [{pokemon.id}]{" "}
          </h2>
          <h3 className="titulo-seccion">Habilidades</h3>
          {pokemon.abilities?.map(
            (
              ability,
              index // Agrega el parámetro index
            ) => (
              <span key={index} className="tag">
                {ability}
              </span> // Usa index como key
            )
          )}

          <h3 className="titulo-seccion">Estadísticas</h3>
          <div className="stats">
            {pokemon.stats?.map(
              (
                stat,
                index // Agrega el parámetro index
              ) => (
                <section key={index}>
                  {" "}
                  <span className="puntos">{stat.base}</span>
                  <span>{stat.name}</span>
                </section> // Usa index como key
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetallePokemon;

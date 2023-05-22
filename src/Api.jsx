import React, { useState, useEffect } from 'react';
import ApiAbs from './ApiAbs';

function Api() {
    const [pagina, setPagina] = useState(1);
  const [pickas, setPickas] = useState([]);
  const [abilities, setAbilities] = useState([]);

  const btnAnterior = (e) => {
    if (pagina > 1) {
    setPagina(pagina => pagina - 20);
      cargarPokemones();
    }
  }

  const btnSiguiente = (e) => {
    if (pagina < 1000) {
        setPagina(pagina => pagina + 20);
      cargarPokemones();
    }
  }

  const cargarPokemones = async () => {
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pagina}&limit=20`);

      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        setPickas(datos.results);
      } else if (respuesta.status === 401) {
        console.log("Key incorrecta");
      } else if (respuesta.status === 404) {
        console.log("no disponible");
      } else {
        console.log("no tengo idea del error");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    cargarPokemones();
  }, [pagina]);

  return (
    <div>
      <div className="contenedor" id="contenedor">
        {pickas.map((pokemon, index) => {
          const url = pokemon.url;
          const id = url.split("/").slice(6, -1);
          return (
            <div className="pokemon" key={index}>
              <img className="imagen" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={`Pokemon ${id}`} />
              <p>id: {id}</p>
              <h3 className="titulo">Nombre: {pokemon.name}</h3>
              <ApiAbs id={id} />
            </div>
          );
        })}
      </div>
      <div className="paginacion">
        <button onClick={btnAnterior}>Anterior</button>
        <button onClick={btnSiguiente} id="btnSiguiente">Siguiente</button>
      </div>
    </div>
  )
}

export default Api;
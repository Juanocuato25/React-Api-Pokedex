import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
      console.log("res: ", res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <h4>Ingrese el nombre del pokemon</h4>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Ej: Pikachu"
          />
        </label>
      </form>
      {pokemonData.map((data) => {
        return (
          <section className="info_pokemon">
              <figure class="img_pokemon">
                <img src={data.sprites["front_default"]} />
                <caption><strong>{"Nombre:"}</strong>{data.forms[0].name.toUpperCase()}</caption>
                <caption><strong>{"Tipo de Pokemon: "}</strong> {pokemonType.toUpperCase()}</caption>
              </figure>
              <table className="table_infoP">
                <p><strong>{"Estadisticas de: "}</strong>{data.forms[0].name.toUpperCase()}</p>
                <tr className="item">
                  <td><strong>❤️ Vida...............................</strong></td>
                  <td><mark>{" "} {data.stats[0].base_stat}</mark></td>
                </tr>
                <tr>
                  <td><strong>💥 Ataque..........................</strong></td>
                  <td><mark>{data.stats[1].base_stat}</mark></td>
                </tr>
                <tr>
                  <td><strong>🛡️ Defensa.........................</strong></td>
                  <td><mark>{data.stats[2].base_stat}</mark></td>
                </tr>
                <tr>
                  <td><strong>⚡Velocidad......................</strong></td>
                  <td><mark> {data.stats[5].base_stat}</mark></td>
                </tr>
                <tr>  
                  <td><strong>🎆Ataque Especial............</strong></td>
                  <td><mark> {data.stats[3].base_stat}</mark></td>
                </tr>
                <tr>
                  <td><strong>🚫Defensa Especial..........</strong></td>
                  <td><mark>{data.stats[4].base_stat}</mark></td>
                </tr>
                <tr>
                  <td><strong>⚔️Numero de batallas.....</strong></td>
                  <td><mark>{data.game_indices.length}</mark></td>
                </tr>
              </table>
          </section>
        );
      })}
    </div>
  );
};

export default App;

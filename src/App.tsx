import React, { useEffect, useState } from "react";
import AutoComplete, { ListItem } from "components/AutoComplete";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState<ListItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const pokemon: ListItem[] = [];

      const promises = new Array(20)
        .fill(0)
        .map((v, i) =>
          fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`),
        );

      Promise.all(promises).then((pokemonArr) => {
        return pokemonArr.map((value) =>
          value
            .json()
            .then(({ name, sprites: { front_default: sprite } }) =>
              pokemon.push({ title: name, imageUrl: sprite }),
            ),
        );
      });

      setPokemonList(pokemon);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Auto Complete</h1>

      <AutoComplete placeholder="Loook for a Pokemon..." list={pokemonList} />
    </div>
  );
}

export default App;

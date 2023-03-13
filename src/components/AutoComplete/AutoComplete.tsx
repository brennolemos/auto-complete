import { useEffect, useState } from "react";

import styles from "./AutoComplete.module.css";

const AutoComplete = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState<
    {
      name: string;
      sprite: string;
    }[]
  >([]);
  const [search, setSearch] = useState("");

  const setActivePokemon = (pokemon: any) => {
    setSearch(pokemon.name);
    setDisplay(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const pokemon: {
        name: string;
        sprite: string;
      }[] = [];

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
              pokemon.push({ name, sprite }),
            ),
        );
      });
      // console.log(pokemon);
      console.log(pokemon);
      setOptions(pokemon);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Auto Complete</h1>

      <input
        id="auto"
        type="text"
        onClick={() => setDisplay(!display)}
        placeholder="Loook for a Pokemon..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className={styles.searchInput}
      />

      {display && (
        <div className={styles.dataResult}>
          {options
            .filter(({ name }) => !name.indexOf(search.toLowerCase()))
            .map((option, index) => (
              <div
                key={`pokemon-${index}`}
                onClick={() => setActivePokemon(option)}
                tabIndex={0}
                className={styles["dataResult__item"]}
              >
                <span className={styles["dataResult__item__text"]}>
                  {option.name}
                </span>

                <img
                  className={styles["dataResult__item__image"]}
                  src={option.sprite}
                  alt={option.name}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;

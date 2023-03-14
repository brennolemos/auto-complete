import { ChangeEvent, useEffect, useState } from "react";

import styles from "./AutoComplete.module.css";

const AutoComplete = () => {
  const [filteredData, setFilteredData] = useState<
    {
      name: string;
      sprite: string;
    }[]
  >([]);
  const [options, setOptions] = useState<
    {
      name: string;
      sprite: string;
    }[]
  >([]);
  const [enteredWord, setEnteredWord] = useState("");

  const handleFilteredList = (filterItem: string) => {
    const newFilter = options.filter((option) =>
      option.name.toLowerCase().includes(filterItem.toLowerCase()),
    );

    if (filterItem === "") return setFilteredData([]);

    setFilteredData(newFilter);
  };

  const setActiveItem = (item: string) => {
    setEnteredWord(item);

    handleFilteredList(item);
  };

  const handlefilter = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setEnteredWord(searchWord);

    handleFilteredList(searchWord);
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
        placeholder="Loook for a Pokemon..."
        value={enteredWord}
        onChange={handlefilter}
        className={styles.searchInput}
      />

      {filteredData.length !== 0 && (
        <div className={styles.dataResult}>
          {filteredData.map((option, index) => (
            <div
              key={`pokemon-${index}`}
              onClick={() => setActiveItem(option.name)}
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

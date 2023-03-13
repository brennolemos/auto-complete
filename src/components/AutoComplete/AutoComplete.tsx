import { useEffect, useState } from "react";

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
    <>
      <h1>Auto Complete</h1>

      <input
        id="auto"
        type="text"
        onClick={() => setDisplay(!display)}
        placeholder="Loook for a Pokemon..."
      />

      {display && (
        <div>
          {options.map((option, index) => (
            <div
              key={`pokemon-${index}`}
              onClick={() => setActivePokemon(option)}
            >
              <span>{option.name}</span>
              <img src={option.sprite} alt={option.name} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AutoComplete;

import { ChangeEvent, useState } from "react";

import { AutoCompleteProps, ListItem } from "./AutoComplete.types";
import styles from "./AutoComplete.module.css";

const AutoComplete = ({ list, placeholder }: AutoCompleteProps) => {
  const [filteredData, setFilteredData] = useState<ListItem[]>([]);
  const [enteredWord, setEnteredWord] = useState("");

  const handleFilteredList = (filterItem: string) => {
    const newFilter = list.filter((listItem) =>
      listItem.title.toLowerCase().includes(filterItem.toLowerCase()),
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

  const clearInput = () => {
    setFilteredData([]);
    setEnteredWord("");
  };

  return (
    <div className={styles.container}>
      <h1>Auto Complete</h1>

      <div className={styles.search}>
        <input
          id="auto"
          type="text"
          placeholder={placeholder}
          value={enteredWord}
          onChange={handlefilter}
          className={styles["search__input"]}
        />

        {enteredWord !== "" && (
          <button onClick={clearInput} className={styles["search__button"]}>
            X
          </button>
        )}
      </div>

      {filteredData.length !== 0 && (
        <div className={styles.dataResult}>
          {filteredData.map((listItem, index) => (
            <div
              key={`list-item-${index}`}
              onClick={() => setActiveItem(listItem.title)}
              tabIndex={0}
              className={styles["dataResult__item"]}
            >
              <span className={styles["dataResult__item__text"]}>
                {listItem.title}
              </span>
              {listItem.imageUrl && (
                <img
                  className={styles["dataResult__item__image"]}
                  src={listItem.imageUrl}
                  alt={listItem.title}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {enteredWord !== "" && filteredData.length === 0 && (
        <p>No found data for your search. Please try another one.</p>
      )}
    </div>
  );
};

export default AutoComplete;

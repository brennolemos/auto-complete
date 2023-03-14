import { ChangeEvent, useState } from "react";

import { AutoCompleteProps, ListItem } from "./AutoComplete.types";
import styles from "./AutoComplete.module.css";

const AutoComplete = ({ list, placeholder }: AutoCompleteProps) => {
  const [filteredData, setFilteredData] = useState<ListItem[]>([]);
  const [enteredWord, setEnteredWord] = useState("");

  /**
   * It takes a string as an argument, filters the list array based on the string, and sets the
   * filteredData array to the filtered list
   * @param {string} filterItem - string - this is the value of the input field.
   * @returns The filtered data is being returned.
   */
  const handleFilteredList = (filterItem: string) => {
    const newFilter = list.filter((listItem) =>
      listItem.title.toLowerCase().includes(filterItem.toLowerCase()),
    );

    if (filterItem === "") return setFilteredData([]);

    setFilteredData(newFilter);
  };

  /**
   * When the user types in the input field, the value of the input field is set to the state variable
   * enteredWord, and the function handleFilteredList is called with the value of the input field as an
   * argument.
   * @param event - ChangeEvent<HTMLInputElement>
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setEnteredWord(searchWord);

    handleFilteredList(searchWord);
  };

  /**
   * SetActiveItem is a function that takes in a string and sets the enteredWord state to the string,
   * and then calls the handleFilteredList function with the string as an argument.
   * @param {string} item - string - the item that was clicked on
   */
  const setActiveItem = (item: string) => {
    setEnteredWord(item);

    handleFilteredList(item);
  };

  /**
   * It clears the filtered data and the entered word
   */
  const clearInput = () => {
    setFilteredData([]);
    setEnteredWord("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          id="auto"
          type="text"
          placeholder={placeholder}
          value={enteredWord}
          onChange={handleOnChange}
          className={styles["search__input"]}
        />

        {enteredWord !== "" && (
          <button
            onClick={clearInput}
            className={styles["search__button"]}
            aria-label="Clear Search"
          >
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

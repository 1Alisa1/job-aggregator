import { useEffect, useState } from "react";
import styles from "./searchInput.module.scss";
import search from "../../img/search.svg";

interface SearchInputProps {
  keyword: string;
  setKeyword: (search: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ keyword, setKeyword }) => {
  const [value, setValue] = useState(keyword);

  useEffect(() => {
    if (!keyword) {
      setValue("");
    }
  }, [keyword]);

  return (
    <div className={styles.searchInputWrapper}>
      <div className={styles.leftSection}>
        <img src={search} alt="search"></img>
      </div>
      <div className={styles.rightSection}>
        <button onClick={() => setKeyword(value)} data-elem="search-button">
          Поиск
        </button>
      </div>
      <input
        type="search"
        className={styles.input}
        value={value}
        placeholder="Введите название вакансии"
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
        data-elem="search-input"
      ></input>
    </div>
  );
};
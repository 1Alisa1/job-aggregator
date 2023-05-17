import { useState } from "react";
import styles from "./searchInput.module.scss";
import search from '../../img/search.svg';

const SearchInput = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.searchInputWrapper}>
      <div className={styles.leftSection}>
        <img src={search} alt="search"></img>
      </div>
      <div className={styles.rightSection}>
        <button>Поиск</button>
      </div>
      <input
        type='search'
        className={styles.input}
        value={value}
        placeholder='Введите название вакансии'
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
      ></input>  
    </div>
  );
};

export default SearchInput;
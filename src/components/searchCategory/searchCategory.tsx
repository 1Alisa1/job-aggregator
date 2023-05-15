import styles from "./searchCategory.module.scss";

interface SearchCategoryProps {
  children: React.ReactNode;
  name: string;
}
const SearchCategory: React.FC<SearchCategoryProps> = ({ children, name }) => {
  return (
    <div className={styles.category}>
      <span className={styles.optionName}>{name}</span>
      {children}
    </div>
  );
};

export default SearchCategory;

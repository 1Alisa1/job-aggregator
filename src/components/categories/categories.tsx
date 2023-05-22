import ICategory from "../../models/categoryModel";
import Loader from "../loader/loader";
import styles from "./categories.module.scss";

interface CategoriesProps {
  active: boolean;
  setActive: (value: boolean) => void;
  loading: boolean;
  error: Error | null;
  categories: ICategory[] | null;
  setIndustryValue: (value: ICategory) => void;
}
const Categories: React.FC<CategoriesProps> = ({
  active,
  setActive,
  loading,
  error,
  categories,
  setIndustryValue,
}) => {
  return (
    <div
      className={
        active ? `${styles.categories} ${styles.show}` : styles.categories
      }
    >
      {loading && <Loader />}
      {error && <div>Error!</div>}
      {!loading &&
        !error &&
        categories &&
        categories.map((el) => (
          <div
            key={el.key}
            className={styles.category}
            onClick={() => {
              setIndustryValue(el);
              setActive(false);
            }}
          >
            <span>{el.title}</span>
          </div>
        ))}
    </div>
  );
};

export default Categories;

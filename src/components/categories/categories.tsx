import { ICategory } from "../../models";
import { Loader } from "../index";
import styles from "./categories.module.scss";

interface CategoriesProps {
  active: boolean;
  setActive: (value: boolean) => void;
  loading: boolean;
  error: Error | null;
  categories: ICategory[] | null;
  setIndustryValue: (value: ICategory) => void;
}
export const Categories: React.FC<CategoriesProps> = ({
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
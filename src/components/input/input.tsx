import styles from "./input.module.scss";
interface InputProps {
  active?: boolean;
  value?: string;
  setValue?: (value: string) => void;
  placeholder: string;
  type?: string;
  readonly?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  rightSection: React.ReactNode;
  pointerEvents?: boolean;
  dataElem: string;
}
const Input: React.FC<InputProps> = ({
  active,
  value,
  setValue,
  placeholder,
  type,
  readonly,
  onClick,
  onChange,
  rightSection,
  pointerEvents,
  dataElem,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <div
        className={styles.rightSection}
        style={{ pointerEvents: pointerEvents ? "auto" : "none" }}
      >
        {rightSection}
      </div>
      <input
        readOnly={readonly ? readonly : false}
        type={type ? type : ""}
        className={styles.input + (active ? " " + styles.active : "")}
        value={value}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        autoComplete="off"
        data-elem={dataElem}
      ></input>
    </div>
  );
};

export default Input;

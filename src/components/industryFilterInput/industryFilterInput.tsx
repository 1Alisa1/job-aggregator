import { useEffect } from "react";
import Input from "../input/input";
import DropDownIcon from "../dropDownIcon/dropDownIcon";
interface IndustryFilterInputProps {
  value: string;
  setActive(active: boolean): void;
  active: boolean;
  dataElem: string;
}

const IndustryFilterInput: React.FC<IndustryFilterInputProps> = ({
  value,
  setActive,
  active,
  dataElem,
}) => {
  const bodyClickHandler = () => {
    setActive(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", bodyClickHandler);
    return () => document.body.removeEventListener("click", bodyClickHandler);
  });

  return (
    <Input
      readonly={true}
      active={active}
      placeholder="Выберите отрасль"
      value={value}
      onClick={(e) => {
        e.stopPropagation();
        setActive(!active);
      }}
      rightSection={<DropDownIcon active={active} />}
      dataElem={dataElem}
    />
  );
};

export default IndustryFilterInput;

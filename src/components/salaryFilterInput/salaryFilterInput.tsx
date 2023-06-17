import { Input } from "../index";
import { UpAndDownBtns } from "../index";

interface SalaryFilterInputProps {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  dataElem: string;
}

export const SalaryFilterInput: React.FC<SalaryFilterInputProps> = ({
  placeholder,
  value,
  setValue,
  dataElem,
}) => {
  return (
    <Input
      readonly={false}
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      pointerEvents={true}
      rightSection={<UpAndDownBtns value={value} setValue={setValue} />}
      dataElem={dataElem}
    />
  );
};
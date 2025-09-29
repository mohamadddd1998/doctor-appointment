import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorMessage, useFormikContext } from "formik";
import { AlertCircle } from "lucide-react";

type TOption = { value: number | string; label: string };

interface SelectFieldProps {
  label: string;
  name: string;
  options: TOption[];
}
const SelectField = ({ label, name, options }: SelectFieldProps) => {
  const { values, setFieldValue } = useFormikContext<any>();
  return (
    <>
      <Label htmlFor="gender"> {label} </Label>
      <Select
        value={values.gender}
        onValueChange={(value) => setFieldValue("gender", value)}
        dir="rtl"
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: TOption) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="text-[10px] text-red-500 flex gap-2">
            <AlertCircle size={12} />
            <span>{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </>
  );
};
export default SelectField;

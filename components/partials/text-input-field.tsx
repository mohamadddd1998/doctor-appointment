import { Field } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ErrorMessage from "./error-message";

interface TextInputFieldProps {
  name: string;
  label: string;
  [key: string]: any;
}
const TextInputField = ({ name, label, ...rest }: TextInputFieldProps) => {
  return (
    <>
      <Label htmlFor={name}> {label} </Label>
      <Field name={name}>
        {({ field }: any) => <Input {...field} {...rest} id={name} />}
      </Field>
      <ErrorMessage name={name} />
    </>
  );
};
export default TextInputField;

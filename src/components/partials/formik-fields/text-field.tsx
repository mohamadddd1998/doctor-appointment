import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field } from "formik";
import { AlertCircle } from "lucide-react";

interface TextFieldProps {
  name: string;
  label: string;
  [key: string]: any;
}
const TextField = ({ name, label, ...rest }: TextFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="label">
        {label}{" "}
      </Label>
      <Field name={name}>
        {({ field }: any) => <Input {...field} {...rest} id={name} />}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="text-[10px] text-red-500 flex gap-2">
            <AlertCircle size={12} />
            <span>{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};
export default TextField;

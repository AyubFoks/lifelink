import { Field, ErrorMessage } from "formik";

export default function InputField({ label, name, type = "text" }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-medium mb-1">{label}</label>
      <Field
        id={name}
        name={name}
        type={type}
        className="w-full border px-3 py-2 rounded-[6px]"
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
}

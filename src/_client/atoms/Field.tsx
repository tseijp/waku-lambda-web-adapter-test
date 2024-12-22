"use client";

import { FormType } from "@/const";

interface Props extends React.HTMLProps<HTMLInputElement> {
  form_type?: FormType | null | undefined;
  title: string;
}

function InputField(props: Props) {
  return <input {...props} />;
}

function TextareaField(props: Props) {
  return <textarea rows={6} {...(props as any)} />;
}

function BlobField(props: Props) {
  const { className, ...other } = props;
  const baseClasses = "max-w-[320px] min-h-[180px]";
  return (
    <label className={`${baseClasses} ${className}`}>
      <input {...other} type="file" />
    </label>
  );
}

function DateField(props: Props) {
  const { className, ...other } = props;
  const baseClasses = "max-w-[320px]";
  return (
    <input {...other} type="date" className={`${baseClasses} ${className}`} />
  );
}

function BoolField(props: Props) {
  const { className, defaultValue, ...other } = props;
  const baseClasses = "w-5 h-5";
  return (
    <input
      {...other}
      className={`${baseClasses} ${className}`}
      type="checkbox"
    />
  );
}

function SelectField(props: Props) {
  const { children, className, name } = props;
  const other = { children, name };
  const baseClasses = "max-w-[320px]";
  return <select {...other} className={`${baseClasses} ${className}`} />;
}

function NumberField(props: Props) {
  const { className, ...other } = props;
  const baseClasses = "max-w-[320px]";
  return (
    <input {...other} type="number" className={`${baseClasses} ${className}`} />
  );
}

function Switch(props: Props) {
  const { form_type = "text" } = props;
  if (form_type === "textarea") return <TextareaField {...props} />;
  if (form_type === "editor") return "@TODO";
  if (form_type === "blob") return <BlobField {...props} />;
  if (form_type === "blobs") return "@TODO";
  if (form_type === "date") return <DateField {...props} />;
  if (form_type === "bool") return <BoolField {...props} />;
  if (form_type === "select") return <SelectField {...props} />;
  if (form_type === "ref") return "@TODO";
  if (form_type === "refs") return "@TODO";
  if (form_type === "number") return <NumberField {...props} />;
  return <InputField {...props} />;
}

export default function Field(props: Props) {
  const { title, className } = props;
  const baseClasses = "mt-2 mb-10 px-4 py-2 rounded border border-[#CDCDDF]";
  return (
    <>
      <label className="font-bold">{title}</label>
      <Switch className={`${baseClasses} ${className}`} {...props} />
    </>
  );
}

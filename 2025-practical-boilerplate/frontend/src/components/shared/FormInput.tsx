/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import { ReactNode } from "react";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  prefix?: ReactNode;
  type?: "text" | "password" | "email";
  rules?: any[];
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  name,
  label,
  placeholder,
  prefix,
  type = "text",
  rules,
  onKeyDown,
}: FormInputProps) => {
  const inputProps = {
    prefix,
    placeholder,
    className: "py-3",
    onKeyDown,
  };

  return (
    <Form.Item name={name} label={label} rules={rules}>
      {type === "password" ? (
        <Input.Password {...inputProps} />
      ) : (
        <Input {...inputProps} type={type} />
      )}
    </Form.Item>
  );
};

export default FormInput;

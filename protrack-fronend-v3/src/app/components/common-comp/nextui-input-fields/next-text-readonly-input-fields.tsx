import { Input } from "@nextui-org/react";
import React from "react";

const NextTextReadOnlyInputField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Input
      isReadOnly
      type="text"
      variant="flat"
      label={label}
      size="sm"
      placeholder="Auto generated..." 
      value={value}
      onChange={onChange}
    />
  );
};

export default NextTextReadOnlyInputField;

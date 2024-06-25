import React from "react";
import { Label, Input } from "reactstrap";

function Check({ changeFn, isChecked, value, label, name, className }) {
  return (
    <Label className={className}>
      <Input
        type="checkbox"
        onChange={changeFn}
        name={name}
        value={value}
        checked={isChecked}
      />
      {label}
    </Label>
  );
}

export default Check;
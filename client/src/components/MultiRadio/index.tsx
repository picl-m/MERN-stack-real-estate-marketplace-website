import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface MultiCheckboxProps {
  title?: string;
  options: string[];
  selected: string | undefined;
  update: (value: string) => void;
}

export default function MultiCheckbox(props: MultiCheckboxProps) {
  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel sx={{ mb: 2 }}>{props.title}</FormLabel>
      <RadioGroup
        aria-label={props.title}
        value={props.selected || ""}
        onChange={(_, value) => props.update(value)}
        row
      >
        {props.options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

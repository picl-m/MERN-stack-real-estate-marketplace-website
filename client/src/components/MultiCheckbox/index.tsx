import React from "react";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";

interface MultiCheckboxProps {
    title?: string;
    options: string[];
    selected: string[];
    update: (value: string[]) => void;
}

export default function MultiCheckbox(props: MultiCheckboxProps) {
    return (
        <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ mb: 2 }}>{props.title}</FormLabel>
            <FormGroup aria-label={props.title} row>
                {props.options.map(option => (
                    <FormControlLabel
                        key={option}
                        value={option}
                        control={<Checkbox
                            checked={props.selected.includes(option)}
                            onChange={(_, value) => {
                                if (value) {
                                    props.update([option ,...props.selected])
                                } else {
                                    props.update(props.selected.filter((test) => test !== option))
                                }
                            }}
                        />}
                        label={option}
                    />
                ))}
            </FormGroup>
        </FormControl>
    )
}
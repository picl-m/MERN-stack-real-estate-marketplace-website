import React from "react";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";

interface MultiCheckboxProps {
    title: string;
    options: string[]
    selected: string[];
    update: (value: string[]) => void;
}

export default function MultiCheckbox(props: MultiCheckboxProps) {
    return (
        <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ mb: 2 }}>{props.title}</FormLabel>
            <FormGroup aria-label="type" row>
                {props.options.map(roomType => (
                    <FormControlLabel
                        key={roomType}
                        value={roomType}
                        control={<Checkbox
                            checked={props.selected.includes(roomType)}
                            onChange={(_, value) => {
                                if (value) {
                                    props.update([roomType ,...props.selected])
                                } else {
                                    props.update(props.selected.filter((test) => test !== roomType))
                                }
                            }}
                        />}
                        label={roomType}
                    />
                ))}
            </FormGroup>
        </FormControl>
    )
}
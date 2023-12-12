import React from "react";
import { FormControl, FormLabel, Stack, TextField } from "@mui/material"

interface NumberRangeProps {
    title: string;
    minValue: number | undefined;
    maxValue: number | undefined;
    minUpdate: (value: number) => void;
    maxUpdate: (value: number) => void;
}

export default function NumberRange(props: NumberRangeProps) {
    return (
        <FormControl component="fieldset" fullWidth>
            <FormLabel sx={{ mb: 2 }}>{props.title}</FormLabel>
            <Stack direction="row" gap={1}>
                    <TextField
                        label="Min"
                        variant="outlined"
                        size="small"
                        value={props.minValue || ""}
                        onChange={(e) => {
                            let value: string = e.target.value;
                            value = value.replace(/\D/g, "");
                            props.minUpdate(Number(value))
                        }}
                    />
                    <TextField
                        label="Max"
                        variant="outlined"
                        size="small"
                        value={props.maxValue || ""}
                        onChange={(e) => {
                            let value: string = e.target.value;
                            value = value.replace(/\D/g, "");
                            props.maxUpdate(Number(value))
                        }}
                    />
                </Stack>
        </FormControl>
    )
}
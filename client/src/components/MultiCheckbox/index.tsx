import React from "react";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material"

import { RoomType } from "../../pages/Search";

interface MultiCheckboxProps {
    title: string;
    options: RoomType[];
    selected: RoomType[];
    update: (value: RoomType[]) => void;
}

export default function MultiCheckbox(props: MultiCheckboxProps) {
    return (
        <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">{props.title}</FormLabel>
            <FormGroup
                aria-label="type"
                row
            >
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
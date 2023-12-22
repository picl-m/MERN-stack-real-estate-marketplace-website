import React from "react";
import { Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { regions, Region, District } from "types/locations";
import locations from "assets/locations.json";
import MultiCheckbox from "components/MultiCheckbox";

interface LocationSelectProps {
    region: Region | undefined;
    district: District | District[] | undefined;
    updateRegion: (region: Region | undefined) => void;
    updateDistrict: (district: District[]) => void;
    checkbox?: boolean;
    label?: boolean;
}

export default function LocationSelect(props: LocationSelectProps) {
    return (
        <FormControl>
            {props.label ? <FormLabel sx={{ mb: 2 }}>Location</FormLabel> : null}

            <Autocomplete
                clearOnBlur
                autoHighlight
                options={regions}
                value={props.region || null}
                renderInput={(params) => <TextField {...params} label="Region" />}
                size="small"
                onChange={(_, value, reason) => {
                    if (reason === "clear")
                        props.updateRegion(undefined)
                    if (value) {
                        props.updateRegion(value as Region);
                    }
                }}
            />

            {props.region ? (
                (props.checkbox && props.district instanceof Array) ? (
                    <MultiCheckbox
                        options={locations[props.region]}
                        selected={props.district}
                        update={(value) => props.updateDistrict(value)}
                    />
                ) : (
                    <RadioGroup
                        row 
                        value={props.district || ""}
                        sx={{ mt: 2 }}
                        onChange={(_, value: District) => {
                            if (value)
                                props.updateDistrict([value]);
                        }}
                    >
                        {locations[props.region].map((district: District) => (
                            <FormControlLabel
                                key={district}
                                value={district}
                                label={district}
                                control={<Radio/>}
                            />
                        ))}
                    </RadioGroup>
                )
            ) : null}
        </FormControl>
    )
}
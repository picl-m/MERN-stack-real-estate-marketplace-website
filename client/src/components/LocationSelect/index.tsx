import React from "react";
import { Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import locations from "../../utils/locations.json";

interface LocationSelectProps {
    region?: keyof typeof locations;
    updateRegion: (region: keyof typeof locations | undefined) => void;
    updateDistrict: (district: string) => void;
}

export default function LocationSelect(props: LocationSelectProps) {
    return (
        <FormControl>
            <FormLabel sx={{ mb: 2 }}>Location</FormLabel>
            <Autocomplete
                clearOnBlur
                autoHighlight
                id="region-select"
                options={Object.keys(locations)}
                renderInput={(params) => <TextField {...params} label="Region" />}
                size="small"
                onChange={(_, value, reason) => {
                    if (reason === "clear")
                        props.updateRegion(undefined)
                    if (value) {
                        props.updateRegion(value as keyof typeof locations);
                    }
                }}
            />
            {props.region?
                <RadioGroup
                    id="district-select"
                    row 
                    sx={{ mt: 2 }}
                    onChange={(_, value) => {
                        if (value)
                            props.updateDistrict(value);
                    }}
                >
                    {locations[props.region].map((district) => (
                        <FormControlLabel
                            key={district}
                            value={district}
                            label={district}
                            control={<Radio/>}
                        />
                    ))}
                </RadioGroup>
            :null}
        </FormControl>
    )
}
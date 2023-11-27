import React from "react";
import { Container, FormControl, FormLabel, Stack, TextField } from "@mui/material";
import { SearchParams, roomTypes, RoomType, extras, Extras } from "../index";

import MultiCheckbox from "../../../components/MultiCheckbox";

interface SearchFormProps {
    searchParams: SearchParams;
    updateSearchParams: (data: Partial<SearchParams>) => void;
}

export default function ApartmentsForm(props: SearchFormProps) {
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <MultiCheckbox
                title="Type"
                options={roomTypes}
                selected={props.searchParams.room_type}
                update={(value: RoomType[]) => props.updateSearchParams({ room_type: value })}
            />
            <MultiCheckbox
                title="Extras"
                options={extras}
                selected={props.searchParams.extras}
                update={(value: Extras[]) => props.updateSearchParams({ extras: value })}
            />
            <FormControl>
                <FormLabel>Price</FormLabel>
                <Stack direction="row" gap={1} marginTop={2}>
                    <TextField label="Min" variant="outlined" size="small"/>
                    <TextField label="Max" variant="outlined" size="small"/>
                </Stack>
            </FormControl>
        </Container>
    )
}
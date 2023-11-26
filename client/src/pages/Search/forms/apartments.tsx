import React from "react";
import { Container } from "@mui/material";
import { SearchParams, roomTypes, RoomType, extras, Extras } from "../index";

import MultiCheckbox from "../../../components/MultiCheckbox";

interface SearchFormProps {
    searchParams: SearchParams;
    updateSearchParams: (data: Partial<SearchParams>) => void;
}

export default function ApartmentsForm(props: SearchFormProps) {
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
        </Container>
    )
}
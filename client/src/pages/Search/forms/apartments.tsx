import React from "react";
import { Container } from "@mui/material";
import { SearchParams, roomTypes, RoomType, extras, Extras } from "../index";

import MultiCheckbox from "../../../components/MultiCheckbox";
import NumberRange from "../../../components/NumberRange";

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
            <NumberRange
                title="Price"
                minValue={props.searchParams.min_price}
                maxValue={props.searchParams.max_price}
                minUpdate={(value: number) => props.updateSearchParams({ min_price: value })}
                maxUpdate={(value: number) => props.updateSearchParams({ max_price: value })}
            />
            <NumberRange
                title="Area"
                minValue={props.searchParams.min_area}
                maxValue={props.searchParams.max_area}
                minUpdate={(value: number) => props.updateSearchParams({ min_area: value })}
                maxUpdate={(value: number) => props.updateSearchParams({ max_area: value })}
            />
            <NumberRange
                title="Floor"
                minValue={props.searchParams.min_floor}
                maxValue={props.searchParams.max_floor}
                minUpdate={(value: number) => props.updateSearchParams({ min_floor: value })}
                maxUpdate={(value: number) => props.updateSearchParams({ max_floor: value })}
            />
        </Container>
    )
}
import React from "react";
import { Container } from "@mui/material";
import { SearchParams, houseTypes, HouseType, houseExtras, HouseExtras } from "../index";

import MultiCheckbox from "../../../components/MultiCheckbox";
import LocationSelect from "../../../components/LocationSelect";
import NumberRange from "../../../components/NumberRange";

interface SearchFormProps {
    searchParams: SearchParams;
    updateSearchParams: (data: Partial<SearchParams>) => void;
}

export default function HousesForm(props: SearchFormProps) {
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <MultiCheckbox
                title="Type"
                options={houseTypes}
                selected={props.searchParams.house_type}
                update={(value: HouseType[]) => props.updateSearchParams({ house_type: value })}
            />
            <MultiCheckbox
                title="Extras"
                options={houseExtras}
                selected={props.searchParams.house_extras}
                update={(value: HouseExtras[]) => props.updateSearchParams({ house_extras: value })}
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
            <LocationSelect
                label
                checkbox
                region={props.searchParams.region}
                district={props.searchParams.districts}
                updateRegion={(region) => (
                    props.updateSearchParams({ region: region, districts: [] })
                )}
                updateDistrict={(districts) => props.updateSearchParams({ districts: districts })}
            />
        </Container>
    )
}
import React, { useState } from "react";
import { useNavigate, Link as RouterLink, createSearchParams } from "react-router-dom";
import { Container, Menu, MenuItem, Typography, IconButton, Stack, Divider, ToggleButtonGroup, ToggleButton, Box, Button } from "@mui/material"
import { KeyboardArrowDown } from "@mui/icons-material";

import ApartmentsForm from "./forms/apartments";
import HousesForm from "./forms/houses";
import LandForm from "./forms/land";
import Layout from "../../components/Layout";
import locations from "../../utils/locations.json";

export type EstateType = "houses" | "apartments" | "land";
export type DealType = "sale" | "rent";

export const houseTypes = ["1 room", "2 rooms", "3 rooms", "4 rooms", "5 rooms and more"];
export type HouseType = typeof houseTypes[number];

export const apartmentTypes = ["1+kt", "1+1", "2+kt", "2+1", "3+kk", "3+1", "4+kk", "4+1", "5 and more"];
export type ApartmentType = typeof apartmentTypes[number];

export const landTypes = ["housing", "commercial", "field", "forest", "pond", "garden"];
export type LandType = typeof landTypes[number];

export const houseExtras = ["balcony", "parking", "garden", "basement", "garage", "wooden","furnished"];
export type HouseExtras = typeof houseExtras[number];

export const apartmentExtras = ["balcony", "parking", "garage", "lift", "furnished"];
export type ApartmentExtras = typeof apartmentExtras[number];

export const buildingTypes = ["brick", "panel", "steel"];
export type BuildingType = typeof buildingTypes[number];

export interface SearchParams {
    type: string[];
    extras: string[];
    building_type: string[];
    region?: keyof typeof locations;
    districts: string[];
    min_price?: number;
    max_price?: number;
    min_area?: number;
    max_area?: number;
    min_floor?: number;
    max_floor?: number;
}

interface SearchProps {
    estateType: EstateType;
}

export default function Search(props: SearchProps) {
    const [estateTypeAnchor, setEstateTypeAnchor] = useState<null | HTMLElement>(null);
    const estateTypeMenuOpen = Boolean(estateTypeAnchor);

    const navigate = useNavigate();

    const displayEstateType = props.estateType.charAt(0).toUpperCase() + props.estateType.slice(1);

    const [dealType, setDealType] = useState<DealType>("sale");
    const [searchParams, setSearchParams] = useState<SearchParams>({
        type: [],
        extras: [],
        building_type: [],
        districts: []
    });

    const updateSearchParams = (params: Partial<SearchParams>) => {
        setSearchParams({...searchParams, ...params});
    }

    const getEstateForm = () => {
        switch(props.estateType) {
            case "houses":
                return(
                    <HousesForm searchParams={searchParams} updateSearchParams={updateSearchParams}/>
                );
            case "apartments":
                return(
                    <ApartmentsForm searchParams={searchParams} updateSearchParams={updateSearchParams}/>
                );
            case "land":
                return(
                    <LandForm searchParams={searchParams} updateSearchParams={updateSearchParams}/>
                );
        }
    }

    const goToResults = () => {
        let resultsSearchParams = createSearchParams(Object.entries(searchParams).filter((value) => {
            if (value[1] instanceof Array && !value[1].length) return false
            else if (value[1] === undefined) return false
            else return true
        }));
        resultsSearchParams.append("deal", dealType);
        navigate({
            pathname: "results",
            search: `?${resultsSearchParams}`,
        });
    }

    return (
        <Layout>
            <Container sx={{ py: 4 }} maxWidth="md">
                <Stack direction="row" alignItems="center" paddingBottom={1}>
                    <Typography variant="h4">
                        {displayEstateType}
                    </Typography>
                    <IconButton
                        aria-label="more"
                        id="estate-type-button"
                        aria-controls={estateTypeMenuOpen ? "estate-type-menu" : undefined}
                        aria-expanded={estateTypeMenuOpen ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(e) => setEstateTypeAnchor(e.currentTarget)}
                    >
                        <KeyboardArrowDown/>
                    </IconButton>
                    <Menu
                        id="estate-type-menu"
                        MenuListProps={{ "aria-labelledby": "estate-type-button"}}
                        anchorEl={estateTypeAnchor}
                        open={estateTypeMenuOpen}
                        onClose={() => setEstateTypeAnchor(null)}
                    >
                        <MenuItem 
                            {...{component: RouterLink, to: "/search/houses"}}
                            onClick={() => setEstateTypeAnchor(null)}
                        >
                            Houses
                        </MenuItem>
                        <MenuItem 
                            {...{component: RouterLink, to: "/search/apartments"}}
                            onClick={() => setEstateTypeAnchor(null)}
                        >
                            Apartments
                        </MenuItem>
                        <MenuItem 
                            {...{component: RouterLink, to: "/search/land"}}
                            onClick={() => setEstateTypeAnchor(null)}
                        >
                            Land
                        </MenuItem>
                    </Menu>
                    <Box flexGrow={1}/>
                    <ToggleButtonGroup 
                        exclusive 
                        value={dealType}
                        onChange={(_, value) => setDealType(value)}
                        color="primary"
                    >
                        <ToggleButton value="sale">Buy</ToggleButton>
                        <ToggleButton value="rent">Rent</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <Divider/>
            </Container>
            {getEstateForm()}
            <Container sx={{ textAlign: "center", mt: 4 }}>
                <Button 
                    variant="contained"
                    size="large"
                    onClick={goToResults}
                >
                    Search
                </Button>
            </Container>
        </Layout>
    )
}
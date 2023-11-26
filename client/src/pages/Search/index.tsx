import React, { useState } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import { Container, Toolbar, Menu, MenuItem, Typography, IconButton, Stack, Divider, ToggleButtonGroup, ToggleButton, Box, Button } from "@mui/material"
import { KeyboardArrowDown } from "@mui/icons-material";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

import ApartmentsForm from "./forms/apartments";
import HousesForm from "./forms/houses";
import LandForm from "./forms/land";

export type EstateType = "houses" | "apartments" | "land";
export type DealType = "sale" | "rent";

export const roomTypes = ["1+kt", "1+1", "2+kt", "2+1", "3+kk", "3+1", "4+kk", "4+1", "5+kk", "5+1"];
export type RoomType = typeof roomTypes[number];

export const extras = ["balcony", "parking", "garden", "basement", "garage", "lift"];
export type Extras = typeof extras[number];

export interface SearchParams {
    room_type: RoomType[];
    extras: Extras[];
    min_price?: number;
    max_price?: number;
}

export default function HomePage() {
    const [estateTypeAnchor, setEstateTypeAnchor] = useState<null | HTMLElement>(null);
    const estateTypeMenuOpen = Boolean(estateTypeAnchor);

    const [currentSearchParams] = useSearchParams();
    const estateType = currentSearchParams.get("estate_type") as EstateType ?? "apartments";
    const displayEstateType = estateType.charAt(0).toUpperCase() + estateType.slice(1);

    const [dealType, setDealType] = useState<DealType>("sale");
    const [searchParams, setSearchParams] = useState<SearchParams>({ room_type: [], extras: [] });

    const updateSearchParams = (params: Partial<SearchParams>) => {
        setSearchParams({...searchParams, ...params});
    }

    const getSearchURL = () => {
        let searchURL = new URLSearchParams([...Object.entries(searchParams)]);
        searchURL.append("estate_type", estateType);
        searchURL.append("deal_type", dealType);
        return ("/results?" + searchURL);
    }

    const getEstateForm = () => {
        switch(estateType) {
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

    return (
        <>
            <NavBar/>
            <Container sx={{ p: 4 }} maxWidth="md">
                <Toolbar/>
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
                            {...{component: RouterLink, to: "/search?estate_type=houses"}}
                            onClick={() => setEstateTypeAnchor(null)}
                        >
                            Houses
                        </MenuItem>
                        <MenuItem 
                            {...{component: RouterLink, to: "/search?estate_type=apartments"}}
                            onClick={() => setEstateTypeAnchor(null)}
                        >
                            Apartments
                        </MenuItem>
                        <MenuItem 
                            {...{component: RouterLink, to: "/search?estate_type=land"}}
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
                    component={RouterLink}
                    to={getSearchURL()}
                >
                    Search
                </Button>
            </Container>
            <Footer/>
        </>
    )
}
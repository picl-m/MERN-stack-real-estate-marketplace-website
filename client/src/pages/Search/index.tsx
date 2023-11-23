import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Container, Toolbar, Menu, MenuItem, Typography, IconButton, Stack } from "@mui/material"

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function HomePage() {
    const [estateTypeAnchor, setEstateTypeAnchor] = useState<null | HTMLElement>(null);
    const estateTypeMenuOpen = Boolean(estateTypeAnchor);

    const [searchParams] = useSearchParams();
    const estateType = searchParams.get("estate_type") ?? "apartments";
    const displayEstateType = estateType.charAt(0).toUpperCase() + estateType.slice(1);

    return (
        <>
            <NavBar/>
            <Container sx={{ p: 4 }}>
                <Toolbar/>
                <Stack direction="row">
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
                            {...{component: Link, to: "/search?estate_type=apartments"}}
                            onClick={() => setEstateTypeAnchor(null)}
                        >
                            Apartments
                        </MenuItem>
                        <MenuItem 
                            {...{component: Link, to: "/search?estate_type=houses"}}
                            onClick={() => setEstateTypeAnchor(null)}
                        >
                            Houses
                        </MenuItem>
                        <MenuItem 
                            {...{component: Link, to: "/search?estate_type=land"}}
                            onClick={() => setEstateTypeAnchor(null)}
                        >
                            Land
                        </MenuItem>
                    </Menu>
                </Stack>
            </Container>
            <Footer/>
        </>
    )
}
import React from "react";
import { Container, Typography } from "@mui/material";
import { SearchParams } from "../index";

interface SearchFormProps {
    searchParams: SearchParams;
    updateSearchParams: (data: Partial<SearchParams>) => void;
}

export default function LandForm(props: SearchFormProps) {
    return (
        <Container maxWidth="md">
            <Typography>Land</Typography>
        </Container>
    )
}
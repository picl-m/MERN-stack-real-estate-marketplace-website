import { Typography } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";

import { EstateType } from "../Search";

interface HomePageProps {
    estateType: EstateType;
}

export default function SearchResults(props: HomePageProps) {
    const [currentSearchParams] = useSearchParams();

    return (
        <Typography>{props.estateType + ": " + currentSearchParams}</Typography>
    )
}
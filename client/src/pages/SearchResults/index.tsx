import { Container, Typography } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";

import { EstateType } from "../Search";
import Layout from "../../components/Layout";

interface HomePageProps {
    estateType: EstateType;
}

export default function SearchResults(props: HomePageProps) {
    const [currentSearchParams] = useSearchParams();
    let params: string[] = [];
    currentSearchParams.forEach((value) => {
        params.push(value);
    })

    return (
        <Layout>
            <Container>
                {params.map((value) => (
                    <Typography key={value}>{value}</Typography>
                ))}
            </Container>
        </Layout>
    )
}
import React, { useEffect, useState } from "react";
import { Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { EstateType } from "../Search";
import Layout from "../../components/Layout";

interface HomePageProps {
    estateType: EstateType;
}

export default function SearchResults(props: HomePageProps) {
    const [currentSearchParams] = useSearchParams();
    const [results, setResults] = useState<Object[] | undefined>();

    const estateString = 
        props.estateType.charAt(0).toUpperCase() +
        props.estateType.substring(1, props.estateType.length - 1) +
        " for " + currentSearchParams.get("deal");

    const priceString = currentSearchParams.get("deal") === "rent" ? " CZK/month" : " CZK";

    const getResults = async () => {
        let params: any = {};
        currentSearchParams.forEach((value, key) => {
            if (value.includes(",")) {
                params[key] = value.split(",");
            } else {
                params[key] = value;
            }
        })
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/search/" + props.estateType, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(params),
            });
            const data = await res.json();
            if (res.status === 200) {
                setResults(data);
            } else {
                console.log("Server error: " + data);
            }
        } catch (err) {
            let message = "Unknown error";
            if (err instanceof Error) message = err.message;
            console.log("Error getting search results: " + message);
        }
    }

    useEffect(() => {
        getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            <Container>
                {(results && results.length > 0)?
                    <Grid container spacing={2} justifyContent="center">
                        {results.map((result: any, i) => (
                            <Grid item key={i}>
                                <Card>
                                    <CardActionArea
                                        href={"/listing?id=" + result._id}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image="/placeholder.jpg"
                                            alt="estate"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6">
                                                {estateString + " " + result.type + " " + result.area}
                                                m<sup>2</sup>
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                {result.region + ", " + result.district}
                                            </Typography>
                                            <Typography variant="h6">
                                                {result.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + priceString}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                :(results)?
                    <Typography variant="h4" marginTop={4} textAlign="center">No results found</Typography>
                :
                    <Box py={20} display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress/>
                    </Box>
                }
            </Container>
        </Layout>
    )
}
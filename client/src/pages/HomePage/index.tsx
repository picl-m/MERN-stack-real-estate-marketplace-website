import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Box, Grid, Card, CardActionArea, CardContent, CardMedia, Stack, CircularProgress } from "@mui/material"

import { Apartment, House, Landscape } from "@mui/icons-material";
import Layout from "../../components/Layout";

export default function HomePage() {
    const [results, setResults] = useState<Object[] | undefined>();

    const getResults = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/search", {
                method: "GET",
                headers: { "Content-Type": "application/json"}
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
    }, [])

    return (
        <Layout>
            <Box paddingY={{ xs: 4, sm: 10 }} component="section">
                <Container sx={{ textAlign: "center" }}>
                    <Typography variant="h3" gutterBottom>
                        Discover new real estate offers
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph>
                        Buy, rent or auction real estate in the Czech Republic!
                    </Typography>
                    <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
                        <Grid item width={{ xs: 115 ,sm: 150, lg: 220 }}>
                            <Card>
                                <CardActionArea component={RouterLink} to="/search/apartments">
                                    <CardContent>
                                        <Stack spacing={1} alignItems="center">
                                            <Apartment fontSize="large"/>
                                            <Typography>Apartments</Typography>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item width={{ xs: 115 ,sm: 150, lg: 220 }}>
                            <Card>
                                <CardActionArea component={RouterLink} to="/search/houses">
                                    <CardContent>
                                        <Stack spacing={1} alignItems="center">
                                            <House fontSize="large"/>
                                            <Typography>Houses</Typography>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item width={{ xs: 115 ,sm: 150, lg: 220 }}>
                            <Card>
                                <CardActionArea component={RouterLink} to="/search/land">
                                    <CardContent>
                                        <Stack spacing={1} alignItems="center">
                                            <Landscape fontSize="large"/>
                                            <Typography>Land</Typography>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container sx={{ p: 4 }} component="section">
                <Typography variant="h4" gutterBottom>
                    New offers:
                </Typography>
                {(results && results.length > 0)?
                    <Grid container spacing={2} justifyContent="center">
                        {results.map((result: any, i) => (
                            <Grid item key={i}>
                                <Card sx={{ width: 350 }}>
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
                                                {result.__t + " for " + result.deal + ", " + result.type + ", " + result.area}
                                                m<sup>2</sup>
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                {result.region + ", " + result.district}
                                            </Typography>
                                            <Typography variant="h6">
                                                {result.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
                                                    (result.deal==="rent"?" CZK/month":" CZK")
                                                }
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
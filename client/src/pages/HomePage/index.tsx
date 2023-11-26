import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Box, Grid, Card, CardActionArea, CardContent, CardMedia, Toolbar, Stack } from "@mui/material"

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Apartment, House, Landscape } from "@mui/icons-material";

export default function HomePage() {
    return (
        <>
            <NavBar/>
            <main>
                <Box sx={{ backgroundColor: "#e5f3fe" }} paddingY={{ xs: 4, sm: 10 }} component="section">
                    <Container sx={{ textAlign: "center" }}>
                        <Toolbar/>
                        <Typography variant="h3" gutterBottom>
                            Discover new real estate offers
                        </Typography>
                        <Typography variant="h6" color="text.secondary" paragraph>
                            Buy, rent or auction real estate in the Czech Republic!
                        </Typography>
                        <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
                            <Grid item width={{ xs: 115 ,sm: 150, lg: 220 }}>
                                <Card>
                                    <CardActionArea component={RouterLink} to="/search?estate_type=apartments">
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
                                    <CardActionArea component={RouterLink} to="/search?estate_type=houses">
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
                                    <CardActionArea component={RouterLink} to="/search?estate_type=land">
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
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image="https://d18-a.sdn.cz/d_18/c_img_QL_J7/gbYBfr3.jpeg?fl=res,749,562,3|wrm,/watermark/sreality.png,10|shr,,20|jpg,90"
                                        alt="estate"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            New apartment
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Praha 4, Nusle
                                        </Typography>
                                        <Typography gutterBottom variant="h6">
                                            5 000 000 CZK
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image="https://d18-a.sdn.cz/d_18/c_img_QL_J7/gbYBfr3.jpeg?fl=res,749,562,3|wrm,/watermark/sreality.png,10|shr,,20|jpg,90"
                                        alt="estate"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            New apartment
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Praha 4, Nusle
                                        </Typography>
                                        <Typography gutterBottom variant="h6">
                                            5 000 000 CZK
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image="https://d18-a.sdn.cz/d_18/c_img_QL_J7/gbYBfr3.jpeg?fl=res,749,562,3|wrm,/watermark/sreality.png,10|shr,,20|jpg,90"
                                        alt="estate"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            New apartment
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Praha 4, Nusle
                                        </Typography>
                                        <Typography gutterBottom variant="h6">
                                            5 000 000 CZK
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image="https://d18-a.sdn.cz/d_18/c_img_QL_J7/gbYBfr3.jpeg?fl=res,749,562,3|wrm,/watermark/sreality.png,10|shr,,20|jpg,90"
                                        alt="estate"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            New apartment
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Praha 4, Nusle
                                        </Typography>
                                        <Typography gutterBottom variant="h6">
                                            5 000 000 CZK
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <Footer/>
        </>
    )
}
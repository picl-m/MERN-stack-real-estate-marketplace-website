import { Card, CardActionArea, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import { Apartment, House, Landscape } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

export default function Create() {
    return (
        <Layout>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4">Create a new listing:</Typography>
                <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
                        <Grid item width={{ xs: 115 ,sm: 150, lg: 220 }}>
                            <Card>
                                <CardActionArea component={RouterLink} to="apartment">
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
                                <CardActionArea component={RouterLink} to="house">
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
                                <CardActionArea component={RouterLink} to="land">
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
        </Layout>
    )
}
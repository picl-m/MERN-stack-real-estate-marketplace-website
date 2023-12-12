import { Card, CardActionArea, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import { Apartment, House, Landscape } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

export default function Create() {
    const linkCards = [
        {
            title: "Apartment",
            url: "apartment",
            icon: <Apartment fontSize="large"/>,
        },
        {
            title: "House",
            url: "house",
            icon: <House fontSize="large"/>,
        },
        {
            title: "Land",
            url: "land",
            icon: <Landscape fontSize="large"/>,
        },
    ]

    return (
        <Layout>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4">Create a new listing:</Typography>
                <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
                    {linkCards.map(element => (
                        <Grid item key={element.title} width={{ xs: 115 ,sm: 150, lg: 220 }}>
                            <Card>
                                <CardActionArea component={RouterLink} to={element.url}>
                                    <CardContent>
                                        <Stack spacing={1} alignItems="center">
                                            {element.icon}
                                            <Typography>{element.title}</Typography>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Layout>
    )
}
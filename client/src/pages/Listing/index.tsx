import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Divider, ImageList, ImageListItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Box, List, ListItem, Avatar, Stack, ListItemIcon, ListItemText } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Email, Phone } from "@mui/icons-material";

import Layout from "components/Layout";

import { getListing } from "api/estate/search";
import { Estate } from "types/estate";

export default function SearchResults() {
    const [currentSearchParams] = useSearchParams();
    const [listing, setListing] = useState<Estate | null | undefined>();
    const mobile = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        const id = currentSearchParams.get("id");
        if (id) {
            getListing(id).then(data => {
                if (data) {
                    setListing(data);
                } else {
                    setListing(null);
                }
            });
        }
    }, [currentSearchParams])

    const getSpecs = (listing: Estate) => {
        let specs: { name: string, value: string }[]= [];

        specs.push({ name: "Type:", value: listing.type })
        specs.push({
            name: "Area:",
            value: listing.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " m2"
        })

        if (listing.extras && listing.extras.length) {
            specs.push({ name: "Extras:", value: listing.extras.join(", ") })
        }
        if (listing.floor) {
            specs.push({ name: "Floor:", value: listing.floor.toString() })
        }
        if (listing.building_type) {
            specs.push({ name: "Building type:", value: listing.building_type })
        }

        const date = new Date(listing.updatedAt);
        specs.push({ name: "Last updated on:", value: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}` })

        return specs;
    }

    return (
        <Layout>
            <Container maxWidth="md">
                {listing?
                    <>
                        <Box mt={2}>
                        {mobile?
                            <img src="/placeholder.jpg" alt="placeholder" width="100%"/>
                        :
                            <ImageList
                                variant="quilted"
                                rowHeight={200}
                                cols={4}
                                sx={{ m: 0 }}
                            >
                                {[...Array(5)].map((v, i) => (
                                    <ImageListItem key={i} cols={i === 0 ? 2 : 1} rows={i === 0 ? 2 : 1}>
                                        <img src="/placeholder.jpg" alt="placeholder"/>
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        }
                        </Box>
                        <Typography variant="h4" mt={2} gutterBottom>
                            {`${listing.__t} for ${listing.deal}, ${listing.type}, ${listing.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`}
                            m<sup>2</sup>
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            {listing.region + ", " + listing.district}
                        </Typography>
                        <Typography variant="h4" paragraph>
                            {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + 
                            (listing.deal === "rent" ? " CZK/month" : " CZK")}
                        </Typography>
                        <Divider sx={{ mb: 2 }}/>
                        <Typography component="pre" paragraph minHeight={200}>
                            {listing.description}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="specifications table">
                                <TableBody>
                                    {getSpecs(listing).map((spec: { name: string, value: string }) => (
                                        <TableRow
                                            key={spec.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th">{spec.name}</TableCell>
                                            <TableCell>{spec.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography mt={4} variant="h4" mb={2}>Contact the seller:</Typography>
                        <Stack direction="row" gap={3}>
                            <Avatar sx={{ width: 64, height: 64, mt: 1 }}/>
                            <Box>
                                <Typography variant="h6">{listing.full_name}</Typography>
                                <List>
                                    <ListItem disableGutters>
                                        <ListItemIcon>
                                            <Email/>
                                        </ListItemIcon>
                                        <ListItemText primary="Email" secondary={listing.email}/>
                                    </ListItem>
                                    <ListItem disableGutters>
                                        <ListItemIcon>
                                            <Phone/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Phone"
                                            secondary={"+420 " + listing.phone.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Stack>
                    </>
                :(listing === null)?
                    <Typography variant="h4" mt={2}>Couldn't find listing</Typography>
                :
                    <Box py={20} display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress/>
                    </Box>
                }
            </Container>
        </Layout>
    )
}
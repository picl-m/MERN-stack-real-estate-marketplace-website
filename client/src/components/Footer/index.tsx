import React from "react";
import { Container, Divider, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Container component="footer" sx={{ mt: 4 }}>
            <Divider/>
            <Typography paddingY={4}>Footer</Typography>
        </Container>
    )
}
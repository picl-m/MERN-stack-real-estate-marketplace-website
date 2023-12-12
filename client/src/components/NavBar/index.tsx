import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Button, Toolbar, Link, Box } from "@mui/material";

export default function NavBar() {
    return (
        <AppBar 
            color="default"
            component="header"
        >
            <Toolbar>
                <Link variant="h5" component={RouterLink} to="/" underline="none" color="text.primary">
                    LOGO
                </Link>
                <Box flexGrow={1}/>
                <Button variant="outlined" component={RouterLink} to="/create">CREATE LISTING</Button>
            </Toolbar>
        </AppBar>
    )
}
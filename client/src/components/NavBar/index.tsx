import React from "react";
import { AppBar, Button, Toolbar, Link, Box } from "@mui/material";

export default function NavBar() {
    return (
        <AppBar 
            color="default"
            component="header"
        >
            <Toolbar>
                <Link variant="h5" href="/" underline="none" color="text.primary">LOGO</Link>
                <Box sx={{ flexGrow: 1 }}/>
                <Button variant="outlined">LOG IN</Button>
                <Button variant="outlined" sx={{ ml: 1 }}>SIGN UP</Button>
            </Toolbar>
        </AppBar>
    )
}
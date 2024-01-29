import { Container, Typography } from "@mui/material";
import React from "react";
import Layout from "components/Layout";

export default function Error() {
  return (
    <Layout>
      <Container>
        <Typography textAlign="center" mt={4} variant="h4">
          This page could not be found
        </Typography>
      </Container>
    </Layout>
  );
}

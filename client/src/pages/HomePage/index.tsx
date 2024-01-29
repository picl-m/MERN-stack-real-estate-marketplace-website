import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";

import { Apartment, House, Landscape } from "@mui/icons-material";
import Layout from "components/Layout";
import Carousel from "react-material-ui-carousel";

import { getRecent } from "api/estate/search";
import { Estate } from "types/estate";

export default function HomePage() {
  const [results, setResults] = useState<Estate[] | undefined>();
  const mobile = useMediaQuery("(max-width:800px)");

  useEffect(() => {
    getRecent().then((data) => {
      setResults(data);
    });
  }, []);

  const getCarouselData = (): Estate[][] => {
    if (results) {
      if (!mobile) {
        let newResults = [];
        for (let i = 0; i < results.length; i += 3) {
          newResults.push([results[i], results[i + 1], results[i + 2]]);
        }
        return newResults;
      } else {
        let newResults: Estate[][] = [];
        results.forEach((result) => {
          newResults.push([result]);
        });
        return newResults;
      }
    } else {
      return [];
    }
  };

  const linkCards = [
    {
      title: "Apartments",
      url: "/search/apartments",
      icon: <Apartment fontSize="large" />,
    },
    {
      title: "Houses",
      url: "/search/houses",
      icon: <House fontSize="large" />,
    },
    {
      title: "Land",
      url: "/search/land",
      icon: <Landscape fontSize="large" />,
    },
  ];

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
            {linkCards.map((element) => (
              <Grid
                item
                key={element.title}
                width={{ xs: 115, sm: 150, lg: 220 }}
              >
                <Card>
                  <CardActionArea
                    data-test={`card-button-${element.title.toLowerCase()}`}
                    component={RouterLink}
                    to={element.url}
                  >
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
      </Box>
      <Container sx={{ p: 4 }} component="section">
        <Typography variant="h4" gutterBottom>
          New offers:
        </Typography>
        {results && results.length > 0 ? (
          <Carousel navButtonsAlwaysVisible animation="slide">
            {getCarouselData().map((resultArray, i) => (
              <Stack direction="row" gap={2} key={i} justifyContent="center">
                {resultArray.map((result) => (
                  <Card sx={{ width: 380 }} key={result._id}>
                    <CardActionArea href={"/listing?id=" + result._id}>
                      <CardMedia
                        component="img"
                        height="200"
                        image="/placeholder.jpg"
                        alt="estate"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" noWrap>
                          {result.__t +
                            " for " +
                            result.deal +
                            ", " +
                            result.type +
                            ", " +
                            result.area}
                          m<sup>2</sup>
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {result.region + ", " + result.district}
                        </Typography>
                        <Typography variant="h6">
                          {result.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
                            (result.deal === "rent" ? " CZK/month" : " CZK")}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Stack>
            ))}
          </Carousel>
        ) : results ? (
          <Typography variant="h4" marginTop={4} textAlign="center">
            No results found
          </Typography>
        ) : (
          <Box
            py={20}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}
      </Container>
    </Layout>
  );
}

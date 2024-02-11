import React, { useEffect } from "react";
import "./Movies.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
//import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import { Container, Grid, Typography } from "@mui/material";
import AddRating from "./AddRating";

const Movies = () => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    async function movieList() {
      const settings = { method: "get" };
      try {
        const dataFetched = await fetch(
          "http://localhost:4000/admin/api/movie-list",
          settings
        );
        setData(await dataFetched.json());
      } catch (error) {
        console.log(error);
      }
    }
    movieList();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {data.map((result, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              ms={4}
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                className="card"
                sx={{ maxWidth: 700, height: 300, borderRadius: 5 }}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.57), rgba(10, 6, 13, 0.49)), url(${result.movie_img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  padding: "1px",
                  marginTop: "20px",
                  display: "flex",
                }}
              >
                <CardActionArea style={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={result.movie_img}
                    alt="green iguana"
                    style={{ borderRadius: "10px" }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      style={{ color: "white", fontWeight: "bold" }}
                    >
                      {result.movie_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ color: "white" }}
                    >
                      {result.movie_details}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <AddRating movieId={result._id} />
                  <Box
                    sx={{
                      marginTop: 2,
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "whitesmoke",
                    }}
                  >
                    <Rating
                      name="hover-feedback"
                      value={result.movie_rating}
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Movies;

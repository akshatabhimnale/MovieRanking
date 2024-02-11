import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const AddRating = (props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(2);
  const [formData, setFormData] = React.useState({
    your_name: "",
    detail_review: "",
    movie_rating: 0,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = "http://localhost:4000/user/api/rating/" + props.movieId;

      const response = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        console.log("Form submitted successfully");
      } else {
        // Handle error
        console.error("Error submitting form");
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        style={{ backgroundColor: "rgb(25,118,210)" }}
        onClick={handleClickOpen}
      >
        Rate this Movie
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            handleClose();
          },
        }}
      >
        <DialogContent sx={{ height: 325, width: 500 }}>
          <FormGroup style={{ flexDirection: "column" }}>
            <TextField
              id="your_name"
              label="Your Name"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={(e) => {
                setFormData({ ...formData, your_name: e.target.value });
              }}
            />
            <TextField
              id="detail_review"
              label="Detail Review"
              variant="outlined"
              fullWidth
              multiline
              margin="normal"
              rows={4}
              onChange={(e) => {
                setFormData({ ...formData, detail_review: e.target.value });
              }}
            />

            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                backgroundColor: "whitesmoke",
              }}
            >
              <Typography marginTop={1}>Rate this movie</Typography>
              <Rating
                id="movie_rating"
                name="hover-feedback"
                value={value}
                onChange={(e, newValue) => {
                  setFormData({ ...formData, movie_rating: newValue });
                  setValue(newValue);
                }}
              />
            </Box>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            ADD Rating
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default AddRating;

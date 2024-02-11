import React, { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { FormGroup, Stack, Typography } from "@mui/material";

export default function AddMovie() {
  const fileInputRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    movie_name: "",
    movie_detail: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataObj = new FormData();
    console.log(JSON.stringify(formData));

    formDataObj.append("movie_name", formData.movie_name);
    formDataObj.append("movie_detail", formData.movie_detail);
    formDataObj.append("file", fileInputRef.current.files[0]);
    console.log(formDataObj);
    try {
      const response = await fetch(
        "http://localhost:4000/admin/api/add-movie",
        {
          method: "post",

          body: formDataObj,
        }
      );

      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        style={{ backgroundColor: "black" }}
        onClick={handleClickOpen}
      >
        Add Movie
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ height: 374, width: 500 }}>
          <FormGroup style={{ flexDirection: "column" }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <TextField
                id="movie_name"
                name="movie_name"
                label="Movie Name"
                variant="outlined"
                margin="normal"
                value={formData.movie_name}
                fullWidth
                onChange={(e) => {
                  setFormData({ ...formData, movie_name: e.target.value });
                }}
              />
              <TextField
                id="movie_detail"
                name="movie_detail"
                label="Movie Details"
                variant="outlined"
                fullWidth
                multiline
                margin="normal"
                rows={4}
                value={formData.movie_detail}
                onChange={(e) => {
                  setFormData({ ...formData, movie_detail: e.target.value });
                }}
              />
              <Typography style={{ marginTop: 4 }}>Movie Poster</Typography>
              <input type="file" ref={fileInputRef} name="moviePoster" />
              <DialogActions>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button type="submit">ADD MOVIE</Button>
              </DialogActions>
            </form>
          </FormGroup>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

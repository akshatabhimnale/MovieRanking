import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, FormGroup, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    try {
      const url = "http://localhost:4000/admin/api/login";
      const response = await fetch(url, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await response.json();
      if (res.status === true) {
        navigate("/dashboard");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}
    >
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          "& > :not(style)": {
            width: 600,
            height: 682,
          },
        }}
      >
        <Paper style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img src="/img/Academy_Award_trophy.png"></img>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <img src="/img/best-film.webp" style={{ width: 225 }} />
            </div>

            <FormGroup style={{ flexDirection: "column" }}>
              <h1>Hello Admin</h1>
              <h3>Login to manage your account</h3>
              <TextField
                required
                id="email"
                label="Email Id"
                style={{ width: 350 }}
                size="small"
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                style={{ width: 350, marginTop: 10 }}
                size="small"
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              <FormControlLabel control={<Checkbox />} label="Remember me" />
            </FormGroup>
            <div>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "black", width: 350 }}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
          </div>
        </Paper>
      </Box>
    </Box>
  );
}

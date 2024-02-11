import SearchIcon from "@mui/icons-material/Search";
import React from "react";

//import MovieIcon from "@mui/icons-material/Movie";
import {
  AppBar,
  InputBase,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";

import { MenuBook, MenuOpen } from "@mui/icons-material";
import { GridMenuIcon } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <AppBar sx={{ background: "black" }}>
        <Toolbar>
          <GridMenuIcon />
          <Typography> Movie Rating</Typography>

          <Tabs sx={{ marginLeft: "auto" }} textColor="inherit">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Tab label="Home" />
            <Tab label="Login" onClick={() => navigate("/login")} />
          </Tabs>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;

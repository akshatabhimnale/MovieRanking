import React, { useEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  gridFilteredSortedRowIdsSelector,
  selectedGridRowsSelector,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  FormGroup,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddMovie from "./AddMovie";

const getSelectedRowsToExport = ({ apiRef }) => {
  const selectedRowIds = selectedGridRowsSelector(apiRef);
  if (selectedRowIds.size > 0) {
    return Array.from(selectedRowIds.keys());
  }

  return gridFilteredSortedRowIdsSelector(apiRef);
};

const columns = [
  { field: "_id", headerName: "ID", width: 100 },
  {
    field: "movie_img",
    headerName: "Movie Image",
    width: 400,

    type: "image",
    renderCell: (params) => {
      return (
        <div>
          <img
            src={params.row.movie_img}
            style={{ width: 150, borderRadius: 20 }}
            alt="Image not found"
          />
        </div>
      );
    },
  },
  { field: "movie_name", headerName: "Movie name", width: 200 },
  { field: "movie_details", headerName: "Description", width: 600 },
  {
    field: "movie_rating",
    headerName: "Rating",
    type: "number",
    width: 30,
  },
];

//const rows = [{ id: 1, movieName: "Snow", description: "Jon", rating: 35 }];
const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
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
    <Box sx={{ marginTop: 7 }}>
      <AddMovie />
      <Paper elevation={3}>
        <div style={{ height: 1000, width: "100%" }}>
          <DataGrid
            style={{ marginTop: 10 }}
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
            pageSizeOptions={[5, 10]}
            rowHeight={300}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                printOptions: { getRowsToExport: getSelectedRowsToExport },
              },
            }}
          />
        </div>
      </Paper>
    </Box>
  );
};

export default Dashboard;

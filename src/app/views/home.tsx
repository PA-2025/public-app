import React from "react";
import { ViewProps } from "../types/home";
import { Button } from "@mui/material";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default class View extends React.Component<ViewProps> {
  render() {
    return (
      <div className="home">
        <div className={"container-menu-dataset"}>
          {["Text", "Image", "Audio", "csv"].map((datasetOption, index) => (
            <Button>{datasetOption}</Button>
          ))}
        </div>

        <div className={"container-algo"}>
          <div className={"wrapper"}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Algo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Model</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={"wrapper"}>
            <h2>Train model</h2>
            <div className={"container-train"}>
              <TextField
                id="outlined-basic"
                label="Nb epoch"
                variant="outlined"
              />
              <Button variant="contained" color="primary">
                Train
              </Button>
            </div>
          </div>
          <div className={"wrapper"}>
            <h2>Try model</h2>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

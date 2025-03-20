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
import { AudioRecorder } from "react-audio-voice-recorder";
import * as Process from "node:process";

const addAudioElement = () => {
  const url = URL.createObjectURL(new Blob());
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

export default class View extends React.Component<ViewProps> {
  render() {
    return (
      <div>
        <div className={"banner-title"}>
          <h3>Identify songs from your browser</h3>
        </div>
        <div className={"landing-page"}>
          <div className={"wrapper-left"}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload song
            </Button>

            <h4>or</h4>

            <AudioRecorder
              onRecordingComplete={addAudioElement}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              downloadOnSavePress={true}
              downloadFileExtension="webm"
            />

            <FormControl
              fullWidth
              sx={{
                background: "#fff",
                borderRadius: "10px",
                marginTop: "20px",
                width: "30%",
              }}
            >
              <InputLabel id="demo-simple-select-label">Algo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Algo"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              sx={{ background: "#fff", color: "#08f", marginTop: "20px" }}
            >
              Apply
            </Button>
          </div>

          <div className={"wrapper-right"}>
            <img src={process.env.PUBLIC_URL + "logo.png"} alt="" />
            <h1>Find the genre of your song</h1>
            <Button
              variant="contained"
              sx={{ background: "#fff", color: "#08f", marginTop: "20px" }}
            >
              Try your model
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

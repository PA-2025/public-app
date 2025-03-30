import React from "react";
import { ViewProps } from "../types/home";
import { Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AudioRecorder } from "react-audio-voice-recorder";

const addAudioElement = () => {
  const url = URL.createObjectURL(new Blob());
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

export default class View extends React.Component<ViewProps> {
  render() {
    const { train_mlp, test_mlp, result } = this.props;

    return (
      <div>
        <div className={"pop-up"}>
          <div
            className={"close-pop-up"}
            onClick={() => {
              document.querySelector(".pop-up")?.classList.remove("active");
            }}
          >
            <span className={"close"}>&times;</span>
          </div>
          <h2>
            Your muse is{" "}
            <span>{result != undefined ? result.prediction : ""}</span>
          </h2>
        </div>

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
              <input
                type="file"
                accept="audio/*"
                hidden
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    return;
                  }
                }}
              />
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
              <InputLabel id="select-label">Algo</InputLabel>
              <Select labelId="select-label" id="simple-select" label="Algo">
                <MenuItem value={"mlp"}>MLP</MenuItem>
                <MenuItem value={"cnn"}>CNN</MenuItem>
                <MenuItem value={"linear"}>Linear Regression</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              sx={{ background: "#fff", color: "#08f", marginTop: "20px" }}
              onClick={() => {
                if (document.querySelectorAll("input")[1]?.value === "mlp") {
                  test_mlp().then((r) => console.log(r));
                }
              }}
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
              onClick={() => (document.location = "/train")}
            >
              Train your model
            </Button>
          </div>
        </div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    );
  }
}

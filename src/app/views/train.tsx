import React from "react";
import { ViewProps } from "@/src/app/types/train";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { Neural } from "../../component/neural";

export default class View extends React.Component<ViewProps> {
  private neuralRef = React.createRef<Neural>();

  render() {
    const {
      train_mlp,
      resultsTraining,
      resultsFile,
      selectedGraph,
      setSelectedGraph,
    } = this.props;

    return (
      <div className={"train-page"}>
        <div className={"train-buttons"}>
          <FormControl
            fullWidth
            sx={{
              background: "#2874a6",
              borderRadius: "10px",
              marginTop: "20px",
              width: "30%",
              margin: "auto",
            }}
          >
            <InputLabel id="select-label">Algo</InputLabel>
            <Select labelId="select-label" id="simple-select" label="Algo">
              <MenuItem value={"mlp"}>MLP</MenuItem>
              <MenuItem value={"cnn"}>CNN</MenuItem>
              <MenuItem value={"linear"}>Linear Regression</MenuItem>
            </Select>
          </FormControl>

          <Neural ref={this.neuralRef} />

          <Input
            id="input-number"
            sx={{
              marginTop: "20px",
              background: "#2874a6",
              color: "#fff",
              padding: "10px",
            }}
            type="number"
            placeholder={"nb_epochs"}
          />

          <Slider
            sx={{ width: "30%", margin: "auto", marginTop: "20px" }}
            aria-label="Custom marks"
            defaultValue={0.01}
            min={0}
            max={0.1}
            aria-valuetext={"learning rate"}
            step={0.01}
            valueLabelDisplay="auto"
            id="input-learning-rate"
          />

          <h3>Learning rate</h3>

          <Button
            variant="contained"
            sx={{ background: "#2874a6", color: "#fff", marginTop: "20px" }}
            onClick={() => {
              const nb_epochs = (
                document.querySelector("#input-number") as HTMLInputElement
              ).value;
              const learning_rate = (
                document.querySelector(
                  "#input-learning-rate input",
                ) as HTMLInputElement
              ).value;
              if (document.querySelector("input")?.value === "mlp") {
                train_mlp(
                  parseInt(nb_epochs),
                  this.neuralRef.current?.get_neural() || [],
                  parseFloat(learning_rate),
                ).then((r) => console.log(r));
              }
            }}
          >
            Train
          </Button>
          <div />
        </div>
        <div className={"view_training_results"}>
          <div className={"container-results"}>
            {resultsTraining?.files.map((file, index) => (
              <div key={index}>
                <Button
                  variant="contained"
                  className={"button-result button-result" + index}
                  sx={{
                    background: "#2874a6",
                    color: "#fff",
                    marginTop: "20px",
                  }}
                  onClick={() => {
                    setSelectedGraph(file);
                    if (
                      document
                        .querySelector(".button-result" + index)
                        ?.classList.contains("selected")
                    ) {
                      document
                        .querySelector(".button-result" + index)
                        ?.classList.remove("selected");
                    } else {
                      document
                        .querySelector(".button-result" + index)
                        ?.classList.add("selected");
                    }
                  }}
                >
                  {file}
                </Button>
              </div>
            ))}
          </div>
          <div className={"container-charts"}>
            <LineChart
              title={"Training results"}
              xAxis={[
                {
                  data: Array.from(
                    {
                      length: Math.max(
                        ...(resultsFile?.results.map(
                          (result) => result.data.length,
                        ) || [600]),
                      ),
                    },
                    (_, i) => i + 1,
                  ),
                },
              ]}
              series={
                resultsFile?.results
                  .filter((result) => selectedGraph.includes(result.name))
                  .map((result) => ({
                    data: result.data,
                  })) || []
              }
              width={1000}
              height={500}
            />
          </div>
        </div>
      </div>
    );
  }
}

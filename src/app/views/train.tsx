import React from "react";
import { ViewProps } from "@/src/app/types/train";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default class View extends React.Component<ViewProps> {
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
              background: "#333",
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

          <Input
            id="input-number"
            sx={{
              marginTop: "20px",
              background: "#333",
              color: "#fff",
              padding: "10px",
            }}
            type="number"
            placeholder={"nb_epochs"}
          />

          <Button
            variant="contained"
            sx={{ background: "#333", color: "#fff", marginTop: "20px" }}
            onClick={() => {
              const nb_epochs =
                (
                  document.querySelector(
                    "input[type=number]",
                  ) as HTMLInputElement
                )?.value || "1";
              if (document.querySelector("input")?.value === "mlp") {
                train_mlp(parseInt(nb_epochs), [3, 4, 7]).then((r) =>
                  console.log(r),
                );
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
                  sx={{ background: "#333", color: "#fff", marginTop: "20px" }}
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
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
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

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

export default class View extends React.Component<ViewProps> {
  render() {
    const { train_mlp } = this.props;

    return (
      <div className={"train-page"}>
        <FormControl
          fullWidth
          sx={{
            background: "#fff",
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
          sx={{ marginTop: "20px" }}
          type="number"
          placeholder={"nb_epochs"}
        />

        <Button
          variant="contained"
          sx={{ background: "#fff", color: "#08f", marginTop: "20px" }}
          onClick={() => {
            const nb_epochs =
              (document.querySelector("input[type=number]") as HTMLInputElement)
                ?.value || "1";
            if (document.querySelector("input")?.value === "mlp") {
              train_mlp(parseInt(nb_epochs), [3, 4, 7]).then((r) =>
                console.log(r),
              );
            }
          }}
        >
          Train
        </Button>
      </div>
    );
  }
}

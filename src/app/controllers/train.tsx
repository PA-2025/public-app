import React, { Component } from "react";
import { observer } from "mobx-react";
import { ControllerProps, ControllerState } from "../types/train";
import View from "../views/train";
import { TrainModel } from "../model/train";

@observer
export default class TrainController extends Component<
  ControllerProps,
  ControllerState
> {
  private train_model: TrainModel;

  constructor() {
    super({} as ControllerProps);
    this.state = {
      models: [],
      resultsTraining: undefined,
      resultsFile: undefined,
      selectedGraph: [],
    };

    this.train_model = new TrainModel();

    this.fetch_training_result().then((r) => console.log(r));
    this.fetch_training_result_file().then((r) => console.log(r));
  }

  private async fetch_training_result(): Promise<void> {
    const result = await this.train_model.get_training_results();
    this.setState({ resultsTraining: result });
  }

  private async fetch_training_result_file(): Promise<void> {
    const result = await this.train_model.get_training_results_file();
    console.log(result.results);
    this.setState({ resultsFile: result });
  }

  render() {
    return (
      <View
        resultsTraining={this.state.resultsTraining}
        resultsFile={this.state.resultsFile}
        selectedGraph={this.state.selectedGraph}
        setSelectedGraph={(graph: string) =>
          this.setState((prevState) => {
            const selectedGraph = prevState.selectedGraph;
            if (selectedGraph.includes(graph)) {
              return {
                selectedGraph: selectedGraph.filter((g) => g !== graph),
              };
            } else {
              return { selectedGraph: [...selectedGraph, graph] };
            }
          })
        }
        train_mlp={() => this.train_model.train_mlp(1, [1, 2, 3])}
      />
    );
  }
}

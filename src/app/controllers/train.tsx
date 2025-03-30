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
  state: ControllerState = {
    models: [],
  };

  train_model = new TrainModel();

  render() {
    return <View train_mlp={() => this.train_model.train_mlp(1, [1, 2, 3])} />;
  }
}

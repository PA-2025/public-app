import React, { Component } from "react";
import { observer } from "mobx-react";
import { ControllerProps, ControllerState } from "../types/home";
import View from "../views/home";

@observer
export default class HomeController extends Component<
  ControllerProps,
  ControllerState
> {
  state: ControllerState = {
    models: [],
  };

  render() {
    return <View models={this.state.models} />;
  }
}

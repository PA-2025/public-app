import React, { Component } from "react";
import { observer } from "mobx-react";
import { ControllerProps, ControllerState } from "../types/home";
import View from "../views/home";
import { HomeModel } from "../model/home";

@observer
export default class HomeController extends Component<
  ControllerProps,
  ControllerState
> {
  state: ControllerState = {
    models: [],
    result: undefined,
  };

  home_model = new HomeModel();

  tst_mlp = async () => {
    let file = undefined;
    const audio = document.querySelector("audio");
    if (audio) {
      const blob = await fetch(audio.src).then((r) => r.blob());
      file = new File([blob], "test.mp3");
    }
    const upload_filer = document.querySelector("input");
    if (upload_filer) {
      const files = upload_filer.files;
      if (files && files.length > 0) {
        file = files[0];
      }
    }
    if (!file) {
      alert("Please upload a file first");
      return;
    }
    const result = await this.home_model.predict_mlp(file);
    this.setState({ result: result });
  };

  render() {
    return (
      <View
        result={this.state.result}
        test_mlp={this.tst_mlp}
        train_mlp={this.home_model.train_mlp}
        models={this.state.models}
      />
    );
  }
}

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { ControllerProps, ControllerState } from '../types/home';
import View from '../views/home';
import { HomeModel } from '../model/home';

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
        const audio = document.querySelector('audio');
        if (audio) {
            const blob = await fetch(audio.src).then((r) => r.blob());
            file = new File([blob], 'test.mp3');
        }
        const upload_filer = document.querySelector('input');
        if (upload_filer) {
            const files = upload_filer.files;
            if (files && files.length > 0) {
                file = files[0];
            }
        }
        if (!file) {
            alert('Please upload a file first');
            return;
        }
        const result = await this.home_model.predict_mlp(file);
        this.setState({ result: result });
    };

    tst_all = async () => {
        let audio_file = undefined;
        const audio = document.querySelector('audio');
        if (audio) {
            const blob = await fetch(audio.src).then((r) => r.blob());
            audio_file = new File([blob], 'test.mp3');
        }
        const upload_filer = document.querySelector('input');
        if (upload_filer) {
            const files = upload_filer.files;
            if (files && files.length > 0) {
                audio_file = files[0];
            }
        }
        if (!audio_file) {
            alert('Please upload a file first');
            return;
        }

        const weight_file = document.querySelector(
            '#weight_file'
        ) as HTMLInputElement;
        let weight: File | undefined;
        if (weight_file && weight_file.files && weight_file.files.length > 0) {
            weight = weight_file.files[0];
        } else {
            const response = await fetch('/w_best');
            const blob = await response.blob();
            weight = new File([blob], 'w_best');
        }
        if (!weight) {
            alert('Please upload a weight file first');
            return;
        }

        const result = await this.home_model.predict_all(audio_file, weight);
        this.setState({ result: result });
    };

    render() {
        return (
            <View
                result={this.state.result}
                test_mlp={this.tst_mlp}
                train_mlp={this.home_model.train_mlp}
                test_all={this.tst_all}
                models={this.state.models}
            />
        );
    }
}

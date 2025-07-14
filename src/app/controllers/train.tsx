import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { ControllerProps, ControllerState } from '../types/train';
import View from '../views/train';
import { TrainModel } from '../model/train';

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
            selectedCatDataset: [],
            catDataset: [],
        };

        this.train_model = new TrainModel();

        this.fetch_training_result().then((r) => console.log(r));
        this.fetch_training_result_file().then((r) => console.log(r));
        this.fetch_cat_dataset().then((r) => console.log(r));
    }

    private async fetch_training_result(): Promise<void> {
        const result = await this.train_model.get_training_results();
        this.setState({ resultsTraining: result });
    }

    private async fetch_cat_dataset(): Promise<void> {
        const result = await this.train_model.get_cat_dataset();
        this.setState({ catDataset: result.cat });
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
                                selectedGraph: selectedGraph.filter(
                                    (g) => g !== graph
                                ),
                            };
                        } else {
                            return { selectedGraph: [...selectedGraph, graph] };
                        }
                    })
                }
                train_mlp={(
                    nb_epochs,
                    architecture,
                    learning_rate,
                    filter_cat: string[]
                ) =>
                    this.train_model.train_mlp(
                        nb_epochs,
                        architecture,
                        learning_rate,
                        filter_cat
                    )
                }
                train_rbf={(
                    gamma: number,
                    number_cluster: number,
                    filter_cat: string[]
                ) =>
                    this.train_model.train_rbf(
                        gamma,
                        number_cluster,
                        filter_cat
                    )
                }
                train_svm={(
                    nb_epochs,
                    param,
                    learning_rate,
                    filter_cat,
                    lambda_svm,
                    kernel
                ) =>
                    this.train_model.train_svm(
                        nb_epochs,
                        param,
                        learning_rate,
                        filter_cat,
                        lambda_svm,
                        kernel
                    )
                }
                catDataset={this.state.catDataset}
                selectedCatDataset={this.state.selectedCatDataset}
                setSelectedCatDataset={(cat: string) =>
                    this.setState((prevState) => {
                        const selectedGraph = prevState.selectedCatDataset;
                        if (selectedGraph.includes(cat)) {
                            return {
                                selectedCatDataset: selectedGraph.filter(
                                    (g) => g !== cat
                                ),
                            };
                        } else {
                            return {
                                selectedCatDataset: [...selectedGraph, cat],
                            };
                        }
                    })
                }
            />
        );
    }
}

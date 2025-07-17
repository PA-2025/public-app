import ViewModel from '../view-models/train';

export interface ViewProps {
    train_mlp: (
        nb_epochs: number,
        architecture: number[],
        learning_rate: number,
        filter_cat: string[]
    ) => Promise<any>;

    train_rbf: (
        gamma: number,
        number_clusters: number,
        filter_cat: string[]
    ) => Promise<any>;

    train_svm: (
        param: number,
        learning_rate: number,
        filter_cat: string[],
        lambda_svm: number,
        kernel: string
    ) => Promise<any>;

    resultsTraining: GetTrainingResultsResponse | undefined;
    resultsFile: GetTrainingResultsFileResponse | undefined;
    selectedGraph: string[];
    setSelectedGraph: (graph: string) => void;
    catDataset: string[];
    selectedCatDataset: string[];
    setSelectedCatDataset: (cat: string) => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    models: ModelInterface[];
    resultsTraining: GetTrainingResultsResponse | undefined;
    resultsFile: GetTrainingResultsFileResponse | undefined;
    selectedGraph: string[];
    selectedCatDataset: string[];
    catDataset: string[];
}

export interface ModelInterface {
    name: string;
    path: string;
}

export interface GetTrainingResultsResponse {
    files: string[];
}

export interface GetCatDatasetResultsResponse {
    cat: string[];
}

export interface GetTrainingResultsFileResponse {
    results: training_result_by_file[];
}

export interface training_result_by_file {
    name: string;
    data: number[];
}

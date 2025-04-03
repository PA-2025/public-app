import ViewModel from "../view-models/train";

export interface ViewProps {
  train_mlp: (nb_epochs: number, architecture: number[]) => Promise<any>;
  resultsTraining: GetTrainingResultsResponse | undefined;
  resultsFile: GetTrainingResultsFileResponse | undefined;
  selectedGraph: string;
  setSelectedGraph: (graph: string) => void;
}

export interface ControllerProps {
  viewModel: ViewModel;
}

export interface ControllerState {
  models: ModelInterface[];
  resultsTraining: GetTrainingResultsResponse | undefined;
  resultsFile: GetTrainingResultsFileResponse | undefined;
  selectedGraph: string;
}

export interface ModelInterface {
  name: string;
  path: string;
}

export interface GetTrainingResultsResponse {
  files: string[];
}

export interface GetTrainingResultsFileResponse {
  results: training_result_by_file[];
}

export interface training_result_by_file {
  name: string;
  data: number[];
}

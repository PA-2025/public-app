import ViewModel from "../view-models/train";

export interface ViewProps {
  train_mlp: (nb_epochs: number, architecture: number[]) => Promise<any>;
}

export interface ControllerProps {
  viewModel: ViewModel;
}

export interface ControllerState {
  models: ModelInterface[];
}

export interface ModelInterface {
  name: string;
  path: string;
}

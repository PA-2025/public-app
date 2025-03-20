import ViewModel from "../view-models/home";

export interface ViewProps {
  models: ModelInterface[];
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

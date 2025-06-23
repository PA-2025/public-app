import ViewModel from '../view-models/home';

export interface ViewProps {
    models: ModelInterface[];
    train_mlp: (nb_epochs: number, architecture: number[]) => Promise<any>;
    test_all: () => Promise<void>;
    test_mlp: () => Promise<void>;
    result?: result_prediction;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    models: ModelInterface[];
    result?: result_prediction;
}

export interface ModelInterface {
    name: string;
    path: string;
}

export interface result_prediction {
    prediction: string;
}

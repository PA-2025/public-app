import {
    GetCatDatasetResultsResponse,
    GetTrainingResultsFileResponse,
    GetTrainingResultsResponse,
} from '@/src/app/types/train';

export class TrainModel {
    public async train_mlp(
        nb_epochs: number,
        architecture: number[],
        learning_rate: number,
        filter_cat: string[]
    ) {
        const response = await fetch(
            `http://localhost:8000/train_mlp?nb_epochs=${nb_epochs}&learning_rate=${learning_rate}`,
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hidden_layers: architecture,
                    filter_cat: filter_cat,
                }),
            }
        );
        const data = await response.json();
        return data;
    }

    public async train_rbf(
        gamma: number,
        number_clusters: number,
        filter_cat: string[]
    ) {
        const response = await fetch(
            `http://localhost:8000/train_rbf?gamma=${gamma}&number_clusters=${number_clusters}`,
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filter_cat),
            }
        );
        const data = await response.json();
        return data;
    }

    public async train_svm(
        param: number,
        learning_rate: number,
        filter_cat: string[],
        lambda_svm: number,
        kernel: string
    ) {
        const response = await fetch(
            `http://localhost:8000/train_svm?learning_rate=${learning_rate}&lambda_svm=${lambda_svm}&kernel=${kernel}&param=${param}`,
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filter_cat),
            }
        );
        const data = await response.json();
        return data;
    }

    public async train_ols(
        filter_cat: string[]
    ) {
        const response = await fetch(
            `http://localhost:8000/train_ols`,
            {
                method: 'POST',

                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filter_cat),
            }
        );
        const data = await response.json();
        return data;
    }

    public async get_cat_dataset(): Promise<GetCatDatasetResultsResponse> {
        const response = await fetch('http://localhost:8000/get_dataset_cat', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    public async get_training_results(): Promise<GetTrainingResultsResponse> {
        const response = await fetch(`http://localhost:8000/get_results`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    public async get_training_results_file(): Promise<GetTrainingResultsFileResponse> {
        const response = await fetch(`http://localhost:8000/get_results_data`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }
}

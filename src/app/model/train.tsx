import {
  GetTrainingResultsFileResponse,
  GetTrainingResultsResponse,
} from "@/src/app/types/train";

export class TrainModel {
  public async train_mlp(
    nb_epochs: number,
    architecture: number[],
    learning_rate: number,
  ) {
    const response = await fetch(
      `http://localhost:8000/train_mlp?nb_epochs=${nb_epochs}&learning_rate=={learning_rate}`,
      {
        method: "POST",

        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(architecture),
      },
    );
    const data = await response.json();
    return data;
  }

  public async get_training_results(): Promise<GetTrainingResultsResponse> {
    const response = await fetch(`http://localhost:8000/get_results`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }

  public async get_training_results_file(): Promise<GetTrainingResultsFileResponse> {
    const response = await fetch(`http://localhost:8000/get_results_data`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
}

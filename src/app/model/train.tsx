export class TrainModel {
  public async train_mlp(nb_epochs: number, architecture: number[]) {
    const response = await fetch(
      `http://localhost:8000/train_mlp?nb_epochs=${nb_epochs}`,
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
}

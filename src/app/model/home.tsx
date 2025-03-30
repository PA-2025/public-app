import { result_prediction } from "@/src/app/types/home";

export class HomeModel {
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

  public async predict_mlp(file: File): Promise<result_prediction> {
    const formData = new FormData();
    formData.append("file", file, file.name);

    const response = await fetch("http://localhost:8000/predict_mlp", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: formData,
    });
    const data: result_prediction = await response.json();
    document.querySelector(".pop-up")?.classList.add("active");
    return data;
  }
}

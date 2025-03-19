import React from "react";
import { ViewProps } from "../types/home";

export default class View extends React.Component<ViewProps> {
  render() {
    return (
      <div className="home">
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
      </div>
    );
  }
}

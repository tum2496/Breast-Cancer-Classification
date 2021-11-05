import React, { Component } from "react";
import { Route } from "react-router-dom";
import CancerPrediction from "./components/CancerPrediction";


class Main extends Component {
  render() {
    return (
      <div>      
        <Route path="/" component={CancerPrediction} exact />      
       </div>
    );
  }
}
export default Main;

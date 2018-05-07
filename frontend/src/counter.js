import React, { Component } from "react";
import PropTypes from "prop-types";

import "./counter.css";

class Counter extends Component {
  render() {
    let result =
      this.props.numberOfMessages === 1
        ? "1 item"
        : `${this.props.numberOfMessages} items`;

    return (
      <div className="counter">
        <h2>{result}</h2>
      </div>
    );
  }
}
export default Counter;

Counter.propTypes = {
  numberOfMessages: PropTypes.number
};

import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { ALL_POSTS_QUERY } from "./App.js";
import "./message-input.css";

export class MessageInput extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    const container = document.querySelector(".message-section");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  componentDidUpdate() {
    const container = document.querySelector(".message-section");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  /**
   * Sends request to mutate the Schema to add new Message to Database,
   * triggers refetch of ALL_POSTS_QUERY.
   */

  addMessage = async () => {
    const { message } = this.state;
    this.setState({ message: "" });
    await this.props.postMutation({
      variables: {
        message
      },
      refetchQueries: [{ query: ALL_POSTS_QUERY }]
    });
  };

  render() {
    return (
      <div className="message-input">
        <div className="input-wrapper">
          <textarea
            className="message-input-field"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            type="text"
            placeholder="Enter your message here"
          />
          <button
            className="input-button"
            disabled={!this.state.message}
            onClick={() => this.addMessage()}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

const POST_MUTATION = gql`
  mutation($message: String!) {
    createPost(message: $message) {
      id
      message
    }
  }
`;

export default graphql(POST_MUTATION, { name: "postMutation" })(MessageInput);

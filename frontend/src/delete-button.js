import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { ALL_POSTS_QUERY } from "./App.js";

import "./delete-button.css";

export class DeleteButton extends Component {
  /**
   * Sends request to mutate the Schema to delete existing Message in Database,
   * triggers refetch of ALL_POSTS_QUERY.
   */

  deleteMessage = async () => {
    const { id } = this.props;
    await this.props.deleteMutation({
      variables: {
        id
      },
      refetchQueries: [{ query: ALL_POSTS_QUERY }]
    });
  };

  render() {
    return (
      <div className="delete-button">
        <button className="delete-button" onClick={this.deleteMessage}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
          </svg>
        </button>
      </div>
    );
  }
}

const DELETE_MUTATION = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export default graphql(DELETE_MUTATION, { name: "deleteMutation" })(
  DeleteButton
);

DeleteButton.propTypes = {
  id: PropTypes.string
};

import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import DeleteButton from "./delete-button.js";
import { ALL_POSTS_QUERY } from "./App.js";
import "./message.css";

export class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.message,
      editMode: false
    };
  }

  /**
   * Formats Date from GraphQL Timestamp (example:2018-05-06T20:34:04.000Z)
   * to DD/MM/YYYY HH:MM Format
   *
   * @param String date
   * @returns Markup including formated Date String
   *
   */

  getFormattedDate = date => {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    const hours = date.substring(11, 13);
    const minutes = date.substring(14, 16);

    return (
      <div className="date">
        <p>
          {day}/{month}/{year} {hours}:{minutes}
        </p>
      </div>
    );
  };

  /**
   * Sends request to mutate the Schema to edit existing Message in Database,
   * triggers refetch of ALL_POSTS_QUERY.
   */

  editMessage = async () => {
    const { id } = this.props;
    const message = this.state.message;
    this.setState({ editMode: false });
    await this.props.editMutation({
      variables: {
        id,
        message
      },
      refetchQueries: [{ query: ALL_POSTS_QUERY }]
    });
  };

  /**
   * Creates the Markup for the avatar Placeholder
   *
   * @returns Markup
   */

  getAvatarPlaceholder = () => {
    return (
      <img
        className="avatar"
        alt="placeholder-avatar"
        src="http://via.placeholder.com/50"
        srcSet="http://via.placeholder.com/50 1x, http://via.placeholder.com/100 2x, http://via.placeholder.com/150 3x"
      />
    );
  };

  /**
   * Creates the Markup for message Section depending on the state in editMode
   * it returns the markup for the read or the write version of the interface
   *
   * @returns Markup
   */

  getMessageMode = () => {
    const Date = this.props.updatedAt
      ? this.getFormattedDate(this.props.updatedAt)
      : this.getFormattedDate(this.props.createdAt);
    if (this.state.editMode) {
      return (
        <div className="edit-wrapper">
          <textarea
            className="edit-textarea"
            type="text"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
          />
          <button className="edit-button" onClick={this.editMessage}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z" />
            </svg>
          </button>
        </div>
      );
    } else {
      return (
        <div className="message-body">
          <div className="message-body-wrapper">
            <p className="message-copy">{this.state.message}</p>
            <button
              className="edit-button"
              onClick={e => this.setState({ editMode: true })}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z" />
              </svg>
            </button>
            <DeleteButton id={this.props.id} />
          </div>
          {Date}
        </div>
      );
    }
  };

  render() {
    const MessageMode = this.getMessageMode();
    const avatar = this.getAvatarPlaceholder();

    return (
      <div className="message">
        <div className="avatar-wrapper">{avatar}</div>
        <div className="message-wrapper">{MessageMode}</div>
      </div>
    );
  }
}

const EDIT_MUTATION = gql`
  mutation($id: ID!, $message: String) {
    updatePost(message: $message, id: $id) {
      id
      updatedAt
    }
  }
`;

export default graphql(EDIT_MUTATION, { name: "editMutation" })(Message);

Message.propTypes = {
  message: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
};

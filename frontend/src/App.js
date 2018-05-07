import React, { Component } from "react";
import MessageInput from "./message-input.js";
import Counter from "./counter.js";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Message from "./message.js";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "./App.css";

export class App extends Component {
  /**
   * Creates the Markup for the initial App including components,
   * based on the finished Server Request, returns empty div if request is pending
   *
   * @returns Markup
   */


  getApp = () => {
    if (this.props.allPostsQuery.loading) {
      return <div  key={'notloaded'}></div>;
    } else {
      return (
        <div className="App" key={'loaded'}>
          <Counter
            numberOfMessages={this.props.allPostsQuery.allPosts.length}
          />
          <div className="message-section">
            {this.props.allPostsQuery.allPosts.map(allPosts => (
              <React.Fragment key={allPosts.id}>
                <Message
                  message={allPosts.message}
                  updatedAt={allPosts.updatedAt}
                  createdAt={allPosts.createdAt}
                  id={allPosts.id}
                />
              </React.Fragment>
            ))}
          </div>
          <MessageInput />
        </div>
      );
    }
  };

  render() {
    const App = this.getApp();
    return <ReactCSSTransitionGroup
    transitionName="initial-load"
    transitionEnter={true}
    transitionLeave={false}
    transitionEnterTimeout={1000}>
    {App}
  </ReactCSSTransitionGroup>;
  }
}

export const ALL_POSTS_QUERY = gql`
  query {
    allPosts {
      id
      message
      createdAt
      updatedAt
    }
  }
`;

const AppWithQuery = graphql(ALL_POSTS_QUERY, {
  name: "allPostsQuery"
})(App);

export default AppWithQuery;

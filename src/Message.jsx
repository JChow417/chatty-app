import React, {Component} from 'react';

const Message = React.createClass({
  render: function () {
    console.log("rendering <Message/>");
    return (
      <div className="message">
        <span className="username">{this.props.message.username}</span>
        <span className="content">{this.props.message.content}</span>
      </div>
    );
  }
});

export default    Message;
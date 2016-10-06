import React, {Component} from 'react';

const MessageSystem = React.createClass({
  render: function () {
    // console.log("rendering <Message/>");
    return (
      <div className="message system">
        {this.props.message.content}
      </div>
    );
  }
});

export default    MessageSystem;
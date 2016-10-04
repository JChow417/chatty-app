import React, {Component} from 'react';
import Message from './Message.jsx';

const MessageList = React.createClass({
  render: function () {
    console.log("rendering <MessageList/>");
    return (
      <div id="message-list">
        <Message />
     </div>
    );
  }
});

export default MessageList;
import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageSystem from './MessageSystem.jsx';

const MessageList = React.createClass({
  render: function () {
    console.log("rendering <MessageList/>");
    var messageNodes = this.props.messages.map((result) => {
      switch(result.type) {
        case "incomingMessage":
          return ( <Message key={result.id} message={result}/> );
          break;
        case "incomingNotification":
          return ( <MessageSystem key={result.id} message={result}/> );
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + result.type);
      }
    });
    return (
      <div id="message-list">
        {messageNodes}
     </div>
    );
  }
});

export default MessageList;
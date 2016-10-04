import React, {Component} from 'react';
import Message from './Message.jsx';

const MessageList = React.createClass({
  render: function () {
    console.log("rendering <MessageList/>");
    return (
      <div id="message-list">
        {this.props.messages.map((result) => (
          <Message key={result.id} message={result}/>
        ))}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
     </div>
    );
  }
});

export default MessageList;
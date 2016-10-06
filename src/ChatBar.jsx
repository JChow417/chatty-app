import React, {Component} from 'react';

const ChatBar = React.createClass({

  getInitialState: function() {
    return {
      name: '',
      value: ''
    };
  },

  onNameChange: function(event) {
    // console.log("onNameChange <ChatBar />");
    this.setState({name: event.target.value});
  },

  onInputChange: function(event) {
    console.log("onInputChange <ChatBar />");
    this.setState({value: event.target.value});
  },

  onInputKeyPress: function (event) {
    // console.log("onInputKeyPress <ChatBar />");
    if(event.key ===  'Enter') {
      var name = this.state.name || "Anonymous";
      this.props.onInputKeyPressEnter({username: name, content: this.state.value});
      this.setState({value: ''});
      // var messageBottom = document.getElementById("message-list");
      // messageBottom.scrollTop = messageBottom.scrollHeight;
    };
  },

  render: function () {
    // console.log("rendering <ChatBar/>");

    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          value={this.state.value}
          onChange={this.onInputChange}
          onKeyPress={this.onInputKeyPress}
        />
      </footer>
    );
  }
});

export default ChatBar;
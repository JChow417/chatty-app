import React, {Component} from 'react';

const ChatBar = React.createClass({

  getInitialState: function() {
    return {
      valueFromInput: ''
    };
  },

  onInputChange: function() {
    console.log("onInputChange <ChatBar />");
    this.setState({valueFromInput: this.theInput.value});
  },

  onInputKeyPress: function (event) {
    console.log("onInputKeyPress <ChatBar />");
    if(event.key ===  'Enter') {
      this.props.onInputKeyPressEnter({username: this.props.name, content: this.theInput.value});
      this.setState({valueFromInput: ''});
    };
  },

  render: function () {
    console.log("rendering <ChatBar/>");

    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.props.name}
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          value={this.state.valueFromInput}
          ref={(input) => {this.theInput = input;}}
          onChange={this.onInputChange}
          onKeyPress={this.onInputKeyPress}
        />
      </footer>
    );
  }
});

export default ChatBar;
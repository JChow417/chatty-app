import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import ReactDOM from 'react-dom';

const App = React.createClass({

  getInitialState: function() {
    var data = {
      usersOnline: "",
      currentUser: {name: "Anonymous", color: ""},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    return {data: data};
  },

  componentDidMount: function() {
    // console.log("componentDidMount <App/>");
    // CONNECTS TO SOCKET
    var chattySocket = new WebSocket('ws://localhost:8080');
    this.socket = chattySocket;
    this.socket.onopen = () => {
      console.log('Connected to server');
    };

    // HANDLES INCOMING DATA FROM SOCKET
    this.socket.onmessage = (event) => {
      var eventData = JSON.parse(event.data);

      if (eventData.type === 'usersOnline') {
        this.state.data.usersOnline = eventData.usersOnline;

      } else if (eventData.type === 'colorAssign') {
        this.state.data.currentUser.color = eventData.color;

      } else {
        this.state.data.messages.push(eventData);

      }
      this.setState({data: this.state.data});
    };
  },

  // componentWillUpdate: function() {
  //   // AUTO SCROLL
  //   var node = ReactDOM.findDOMNode(this.messageListRef);
  //   var currentPostion =  node.scrollTop + node.offsetHeight;
  //   this.shouldScrollBottom =  currentPostion >= node.scrollHeight - node.offsetHeight / 3 || node.offsetHeight >= node.scrollHeight? 1: 0;
  // },

  componentDidUpdate: function() {
    // AUTO SCROLL
    var node = ReactDOM.findDOMNode(this.messageListRef);
    node.scrollTop = node.scrollHeight + 9999;
    // if (this.shouldScrollBottom) {
    //   var node = ReactDOM.findDOMNode(this.messageListRef);
    //   node.scrollTop = node.scrollHeight + 9999;
    // }
  },

  addMessage: function(newMessage) {
    // console.log("addMessage <App />");
    // USER NAME CHANGE
    var newUserName = newMessage.username;
    var oldUserName = this.state.data.currentUser.name;
    if (newUserName !== oldUserName) {
      var notification = {
        'type': 'postNotification',
        'content':`${oldUserName} has changed their name to ${newUserName}`};
      this.socket.send(JSON.stringify(notification));
      this.state.data.currentUser.name = newUserName;
    }

    // USER MESSAGE
    newMessage.type = 'postMessage';
    newMessage.color = this.state.data.currentUser.color;
    this.socket.send(JSON.stringify(newMessage));
  },

  render: function () {
    // console.log("rendering <App/>");
    var userOnlineDisplay = this.state.data.usersOnline === 1? '1 user online': `${this.state.data.usersOnline} users online`;
    return (
      <div className='wrapper'>
        <nav>
          <h1>Chatty</h1>
          <span>{userOnlineDisplay}</span>
        </nav>
        <MessageList
          ref={(input) => {this.messageListRef = input}}
          messages={this.state.data.messages}/>
        <ChatBar
          // name={this.state.data.currentUser.name}
          onInputKeyPressEnter={this.addMessage}
        />
      </div>
    );
  }
});

export default App;

import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

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
    console.log("componentDidMount <App/>");
    var chattySocket = new WebSocket('ws://localhost:8080');
    this.socket = chattySocket;
    this.socket.onopen = () => {
      console.log('Connected to server');
    };

    this.socket.onmessage = (event) => {
      var eventData = JSON.parse(event.data);
      if (eventData.type === 'usersOnline') {
        this.state.data.usersOnline = eventData.usersOnline;
        this.setState({data: this.state.data});

      } else if (eventData.type === 'colorAssign') {
        this.state.data.currentUser.color = eventData.color;
        this.setState({data: this.state.data});

      } else {
        this.state.data.messages.push(eventData);
        this.setState({data: this.state.data});
      }
    };
  },

  addMessage: function(newMessage) {
    console.log("addMessage <App />");
    var NewUserName = newMessage.username;
    var oldUserName = this.state.data.currentUser.name;

    if (NewUserName !== oldUserName) {
      var notification = {
        'type': 'postNotification',
        'content':`${oldUserName} has changed their name to ${NewUserName}`};
      this.socket.send(JSON.stringify(notification));
      this.state.data.currentUser.name = NewUserName;
    }

    newMessage.type = 'postMessage';
    newMessage.color = this.state.data.currentUser.color;
    this.socket.send(JSON.stringify(newMessage));
  },

  render: function () {
    console.log("rendering <App/>");
    var userOnlineDisplay = this.state.data.usersOnline === 1? '1 user online': `${this.state.data.usersOnline} users online`;
    return (
      <div className='wrapper'>
        <nav>
          <h1>Chatty</h1>
          <span>{userOnlineDisplay}</span>
        </nav>
        <MessageList
          messages={this.state.data.messages}/>
        <ChatBar
          name={this.state.data.currentUser.name}
          onInputKeyPressEnter={this.addMessage}
        />
      </div>
    );
  }
});

// class App extends Component {
//   render() {
//     return (
//       <h1>Hello React :)</h1>
//     );
//   }
// }
export default App;

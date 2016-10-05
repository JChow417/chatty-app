import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({

  getInitialState: function() {
    var data = {
      currentUser: {name: "Bob"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    return {data: data};
  },

  componentDidMount: function() {
    console.log("componentDidMount <App/>");
    var chattySocket = new WebSocket('ws://localhost:8080');
    this.socket = chattySocket;
    chattySocket.onopen = function() {
      console.log('Connected to server');
    };
    this.socket.onmessage = (event) => {
      event = JSON.parse(event.data);
      this.state.data.messages.push({id: event.id, username: event.username, content: event.content});
      this.setState({data: this.state.data});
    };
  },

  addMessage: function(newMessage) {
    console.log("addMessage <App />");
    this.socket.send(JSON.stringify(newMessage));
  },

  render: function () {
    console.log("rendering <App/>");
    return (
      <div className='wrapper'>
        <nav>
          <h1>Chatty</h1>
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

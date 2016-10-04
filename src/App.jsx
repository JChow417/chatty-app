import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

var data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

const App = React.createClass({

  getInitialState: function() {
    return {data};
  },

  componentDidMount: function() {
    console.log("componentDidMount <App/>");
    var chattySocket = new WebSocket('ws://localhost:8080');
    this.socket = chattySocket;
    chattySocket.onopen = function() {
      console.log('Connected to server');
    } ;
  },

  addMessage: function(newMessage) {
    console.log("addMessage <App />");
    var id = this.state.data.messages.length + 1;
    this.state.data.messages.push({id: id, username: newMessage.username, content: newMessage.content});

    this.socket.send(JSON.stringify(newMessage));


    this.setState({data: this.state.data});
  },

     // in App.jsx
  // componentDidMount: function() {
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     console.log(this.state);
  //     // Add a new message to the list of messages in the data store
  //     this.state.data.messages.push({id: id, username: "Michelle", content: "Hello there!"});
  //     // Update the state of the app component. This will call render()
  //     this.setState({data: this.state.data})
  //   }, 3000);
  // },

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

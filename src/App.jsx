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

  handleChatBarMessageEnter: function(newMessage) {
    console.log("handleChatBarMessageEnter <App />");
    var id = this.state.data.messages.length + 1;
    console.log('IDDD',id);
    this.state.data.messages.push({id: id, username: newMessage.username, content: newMessage.content});
    this.setState({data: this.state.data})
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
          onInputKeyPress={this.handleChatBarMessageEnter}
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

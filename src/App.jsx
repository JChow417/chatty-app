import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({
  render: function () {
    console.log("rendering <App/>");
    return (
      <div className='wrapper'>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList />
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
        <ChatBar />
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

import React, {Component} from 'react';

const Message = React.createClass({
  render: function () {
    var urlRegExp = /(https?:\/\/\S*\.(?:png|jpe?g|gif))/i;
    var contentArr = this.props.message.content.split(urlRegExp);
    var contentNodes = contentArr.map((result, i) => {
      if (!urlRegExp.test(result)) {
        return (<span key={i} className="text">{result.trim()}</span>);
      } else {
        return (
          <span key={i} className="image"><img src={result.trim()}/></span>
        );
      }
    });

    console.log("rendering <Message/>");
    return (
      <div className="message">
        <span className="username" style={{color: this.props.message.color}}>{this.props.message.username}</span>
        <span className="content">{contentNodes}</span>
      </div>
    );
  }
});

export default    Message;
require('../src/less/input-moment.less');
require('./app.less');

var moment = require('moment');
var React = require('react');
var ReactDOM = require('react-dom');
var InputMoment = require('../src/input-moment');

var App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      m: moment()
    };
  },

  render() {
    return (
      <div className="app">
        <div>{this.state.m.format('YYYY MMMM Do, h:mm')}</div>
        <InputMoment moment={this.state.m} onChange={this.handleChange}/>
      </div>
    );
  },

  handleChange(m) {
    this.setState({m: m});
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));

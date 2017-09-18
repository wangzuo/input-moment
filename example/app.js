import '../src/less/input-moment.less';
import './app.less';
import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from '../src/input-moment';
import packageJson from '../package.json';

class App extends Component {
  state = {
    m: moment().year(2018).month(7).date(8).hours(8).minutes(8).seconds(8)
    // m: moment()
  };

  handleChange = m => {
    this.setState({ m });
  };

  handleSave = () => {
    console.log('saved', this.state.m.format('llll'));
  };

  render() {
    return (
      <div className="app">
        <h1>
          {packageJson.name}: {packageJson.version}
        </h1>
        <h2>{packageJson.description}</h2>
        <form>
          <div className="input">
            <input type="text" value={this.state.m.format('llll')} readOnly />
          </div>
          <InputMoment
            moment={this.state.m}
            onChange={this.handleChange}
            minStep={5}
            onSave={this.handleSave}
          />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

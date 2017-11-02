import '../src/less/input-moment.less';
import './app.less';
import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from '../src/input-moment';
import packageJson from '../package.json';

class App extends Component {
  state = {
    m: moment()
  };

  handleChange = m => {
    this.setState({ m });
  };

  handleSave = () => {
    console.log('saved', this.state.m.format('llll'));
  };

  render() {
    const maxDate = moment();
    const minDate = moment();
    maxDate.set('month', moment().month() + 1);
    maxDate.date(23);
    minDate.date(11);

    console.log('maxDate from app.js', maxDate);
    console.log('minDate from app.js', minDate);

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
            minDate={minDate}
            maxDate={maxDate}
          />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

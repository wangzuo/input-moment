var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var Calendar = require('./calendar');
var Time = require('./time');

module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState() {
    return {
      tab: 1
    };
  },

  render() {
    var tab = this.state.tab;
    var m = this.props.moment;

    return (
      <div className="m-input-moment">
        <div className="options">
          <div className={cx('option', {'is-active': tab === 0})} onClick={this.handleClick.bind(null, 0)}>
            <span className="ion-calendar"></span>
            <span className="text">Date</span>
          </div>
          <div className={cx('option', {'is-active': tab === 1})} onClick={this.handleClick.bind(null, 1)}>
            <span className="ion-clock"></span>
            <span className="text">Time</span>
          </div>
        </div>

        <div className="tabs">
          <Calendar
            className={cx('tab', {'is-active': tab === 0})}
            moment={m}
            onChange={this.props.onChange}
          />

          <Time
            className={cx('tab', {'is-active': tab === 1})}
            moment={m}
            onChange={this.props.onChange}
          />
        </div>

        <button className="btn-save">Save</button>
      </div>
    );
  },

  handleClick(tab) {
    this.setState({tab: tab});
  }
});

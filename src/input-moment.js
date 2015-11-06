var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var Calendar = require('./calendar');
var Time = require('./time');

module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState() {
    return {
      tab: 0
    };
  },

  render() {
    var tab = this.state.tab;
    var m = this.props.moment;

    return (
      <div className="m-input-moment">
        <div className="options">
          <div className={cx('ion-calendar option', {'is-active': tab === 0})} onClick={this.handleClick.bind(null, 0)}>
            Date
          </div>
          <div className={cx('ion-clock option', {'is-active': tab === 1})} onClick={this.handleClick.bind(null, 1)}>
            Time
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

        <button className="btn-save ion-checkmark">Save</button>
      </div>
    );
  },

  handleClick(tab) {
    this.setState({tab: tab});
  }
});

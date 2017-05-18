var cx = require('classnames');
var blacklist = require('blacklist');
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

  getDefaultProps() {
    return {
      prevMonthIcon: 'ion-ios-arrow-left',
      nextMonthIcon: 'ion-ios-arrow-right',
      dateIcon: 'ion-calendar',
      timeIcon: 'ion-clock',
      saveIcon: 'ion-checkmark'
    };
  },

  render() {
    var tab = this.state.tab;
    var m = this.props.moment;
    var props = blacklist(this.props, 'className', 'moment', 'prevMonthIcon', 'nextMonthIcon', 'onSave', 'dateIcon', 'timeIcon', 'saveIcon');
    props.className = cx('m-input-moment', this.props.className);


    return (
      <div {...props}>
        <div className="options">
          <button type="button" className={cx(`${this.props.dateIcon} im-btn`, {'is-active': tab === 0})} onClick={this.handleClickTab.bind(null, 0)}>
            Date
          </button>
          <button type="button" className={cx(`${this.props.timeIcon} im-btn`, {'is-active': tab === 1})} onClick={this.handleClickTab.bind(null, 1)}>
            Time
          </button>
        </div>

        <div className="tabs">
          <Calendar
            className={cx('tab', {'is-active': tab === 0})}
            moment={m}
            onChange={this.props.onChange}
            prevMonthIcon={this.props.prevMonthIcon}
            nextMonthIcon={this.props.nextMonthIcon}
          />
          <Time
            className={cx('tab', {'is-active': tab === 1})}
            moment={m}
            onChange={this.props.onChange}
          />
        </div>

        <button type="button" className={`im-btn btn-save ${this.props.saveIcon}`}
          onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  },

  handleClickTab(tab, e) {
    e.preventDefault();
    this.setState({tab: tab});
  },

  handleSave(e) {
    e.preventDefault();
    if(this.props.onSave) this.props.onSave();
  }
});

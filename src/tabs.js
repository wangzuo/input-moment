var React = require('react');
var cx = require('classnames');
var Calendar = require('./calendar');
var Time = require('./time');

module.exports = React.createClass({
  render() {
    var dateOnly = this.props.dateOnly;
    var timeOnly = this.props.timeOnly;
    var tab = this.props.tab;
    var m = this.props.m;

    return (
      <div className="tabs">
        <Calendar
          className={cx('tab', {'is-active': (tab === 0 && !timeOnly) || dateOnly})}
          moment={m}
          onChange={this.props.onChange}
          prevMonthIcon={this.props.prevMonthIcon}
          nextMonthIcon={this.props.nextMonthIcon}
        />
        <Time
          className={cx('tab', {'is-active': (tab === 1 && !dateOnly) || timeOnly})}
          moment={m}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
});

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var range = require('./range');
require('./chunk');

var Day = React.createClass({
  displayName: 'Day',

  render: function render() {
    var i = this.props.i;
    var w = this.props.w;
    var cn = cx({
      'prev-month': w === 0 && i > 7,
      'next-month': w >= 4 && i <= 14,
      'current-day': i === this.props.d
    });

    return React.createElement(
      'td',
      _extends({ className: cn }, this.props),
      i
    );
  }
});

module.exports = React.createClass({
  displayName: 'Calendar',

  render: function render() {
    var _this = this;

    var m = this.props.moment;
    var d = m.date();
    var d1 = m.clone().subtract(1, 'month').endOf('month').date();
    var d2 = m.clone().date(1).day();
    var d3 = m.clone().endOf('month').date();

    var days = [].concat(range(d1 - d2 + 1, d1), range(1, d3), range(1, 42 - d3 - d2));

    var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return React.createElement(
      'div',
      { className: cx('calendar', this.props.className) },
      React.createElement(
        'div',
        { className: 'toolbar' },
        React.createElement(
          'button',
          { className: 'prev-month', onClick: this.prevMonth },
          React.createElement('i', { className: 'ion-ios-arrow-left' })
        ),
        React.createElement(
          'span',
          { className: 'current-date' },
          m.format('MMMM YYYY')
        ),
        React.createElement(
          'button',
          { className: 'next-month', onClick: this.nextMonth },
          React.createElement('i', { className: 'ion-ios-arrow-right' })
        )
      ),
      React.createElement(
        'table',
        null,
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            weeks.map(function (w, i) {
              return React.createElement(
                'td',
                { key: i },
                w
              );
            })
          )
        ),
        React.createElement(
          'tbody',
          null,
          days.chunk(7).map(function (row, w) {
            return React.createElement(
              'tr',
              { key: w },
              row.map(function (i) {
                return React.createElement(Day, { key: i, i: i, d: d, w: w, onClick: _this.selectDate.bind(null, i) });
              })
            );
          })
        )
      )
    );
  },

  selectDate: function selectDate(i) {
    this.props.onChange(this.props.moment.date(i));
  },

  prevMonth: function prevMonth() {
    this.props.onChange(this.props.moment.subtract(1, 'month'));
  },

  nextMonth: function nextMonth() {
    this.props.onChange(this.props.moment.add(1, 'month'));
  }
});
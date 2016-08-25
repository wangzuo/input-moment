'use strict';

var cx = require('classnames');
var React = require('react');
var InputSlider = require('react-input-slider');

module.exports = React.createClass({
  displayName: 'Time',

  render: function render() {
    var m = this.props.moment;

    return React.createElement(
      'div',
      { className: cx('m-time', this.props.className) },
      React.createElement(
        'div',
        { className: 'showtime' },
        React.createElement(
          'span',
          { className: 'time' },
          m.format('HH')
        ),
        React.createElement(
          'span',
          { className: 'separater' },
          ':'
        ),
        React.createElement(
          'span',
          { className: 'time' },
          m.format('mm')
        )
      ),
      React.createElement(
        'div',
        { className: 'sliders' },
        React.createElement(
          'div',
          { className: 'time-text' },
          'Hours:'
        ),
        React.createElement(InputSlider, {
          className: 'u-slider-time',
          xmin: 0,
          xmax: 23,
          x: m.hour(),
          onChange: this.changeHours
        }),
        React.createElement(
          'div',
          { className: 'time-text' },
          'Minutes:'
        ),
        React.createElement(InputSlider, {
          className: 'u-slider-time',
          xmin: 0,
          xmax: 59,
          x: m.minute(),
          onChange: this.changeMinutes
        })
      )
    );
  },
  changeHours: function changeHours(pos) {
    var m = this.props.moment;
    m.hours(parseInt(pos.x, 10));
    this.props.onChange(m);
  },
  changeMinutes: function changeMinutes(pos) {
    var m = this.props.moment;
    m.minutes(parseInt(pos.x, 10));
    this.props.onChange(m);
  }
});
'use strict';

var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var Calendar = require('./calendar');
var Time = require('./time');

module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState: function getInitialState() {
    return {
      tab: 0
    };
  },

  render: function render() {
    var tab = this.state.tab;
    var m = this.props.moment;

    return React.createElement(
      'div',
      { className: 'm-input-moment' },
      React.createElement(
        'div',
        { className: 'options' },
        React.createElement(
          'div',
          { className: cx('option', { 'is-active': tab === 0 }), onClick: this.handleClick.bind(null, 0) },
          React.createElement('span', { className: 'ion-calendar' }),
          React.createElement(
            'span',
            { className: 'text' },
            'Date'
          )
        ),
        React.createElement(
          'div',
          { className: cx('option', { 'is-active': tab === 1 }), onClick: this.handleClick.bind(null, 1) },
          React.createElement('span', { className: 'ion-clock' }),
          React.createElement(
            'span',
            { className: 'text' },
            'Time'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'tabs' },
        React.createElement(Calendar, {
          className: cx('tab', { 'is-active': tab === 0 }),
          moment: m,
          onChange: this.props.onChange
        }),
        React.createElement(Time, {
          className: cx('tab', { 'is-active': tab === 1 }),
          moment: m,
          onChange: this.props.onChange
        })
      ),
      React.createElement(
        'button',
        { className: 'btn-save' },
        'Save'
      )
    );
  },

  handleClick: function handleClick(tab) {
    this.setState({ tab: tab });
  }
});
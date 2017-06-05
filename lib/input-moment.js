'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _time = require('./time');

var _time2 = _interopRequireDefault(_time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputMoment = function (_Component) {
  _inherits(InputMoment, _Component);

  function InputMoment() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InputMoment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputMoment.__proto__ || Object.getPrototypeOf(InputMoment)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      tab: 0
    }, _this.handleClickTab = function (tab, e) {
      e.preventDefault();
      _this.setState({ tab: tab });
    }, _this.handleSave = function (e) {
      e.preventDefault();
      if (_this.props.onSave) _this.props.onSave();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InputMoment, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tab = this.state.tab;

      var _props = this.props,
          m = _props.moment,
          className = _props.className,
          prevMonthIcon = _props.prevMonthIcon,
          nextMonthIcon = _props.nextMonthIcon,
          onSave = _props.onSave,
          props = _objectWithoutProperties(_props, ['moment', 'className', 'prevMonthIcon', 'nextMonthIcon', 'onSave']);

      var cls = (0, _classnames2.default)('m-input-moment', className);

      return _react2.default.createElement(
        'div',
        _extends({ className: cls }, props),
        _react2.default.createElement(
          'div',
          { className: 'options' },
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: (0, _classnames2.default)('ion-calendar im-btn', { 'is-active': tab === 0 }),
              onClick: function onClick() {
                return _this2.handleClickTab(0);
              }
            },
            'Date'
          ),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: (0, _classnames2.default)('ion-clock im-btn', { 'is-active': tab === 1 }),
              onClick: function onClick() {
                return _this2.handleClickTab(1);
              }
            },
            'Time'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'tabs' },
          _react2.default.createElement(_calendar2.default, {
            className: (0, _classnames2.default)('tab', { 'is-active': tab === 0 }),
            moment: m,
            onChange: this.props.onChange,
            prevMonthIcon: this.props.prevMonthIcon,
            nextMonthIcon: this.props.nextMonthIcon
          }),
          _react2.default.createElement(_time2.default, {
            className: (0, _classnames2.default)('tab', { 'is-active': tab === 1 }),
            moment: m,
            onChange: this.props.onChange
          })
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: 'im-btn btn-save ion-checkmark',
            onClick: this.handleSave
          },
          'Save'
        )
      );
    }
  }]);

  return InputMoment;
}(_react.Component);

InputMoment.defaultProps = {
  prevMonthIcon: 'ion-ios-arrow-left',
  nextMonthIcon: 'ion-ios-arrow-right'
};
exports.default = InputMoment;
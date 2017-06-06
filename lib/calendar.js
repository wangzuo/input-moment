'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

var _chunk = require('lodash/chunk');

var _chunk2 = _interopRequireDefault(_chunk);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = require('moment-range');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

var Day = function Day(_ref) {
  var weekDay = _ref.weekDay,
      weekNumber = _ref.weekNumber,
      selected = _ref.selected,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ['weekDay', 'weekNumber', 'selected', 'className']);

  var prevMonth = weekNumber === 0 && weekDay > 7;
  var nextMonth = weekNumber >= 4 && weekDay <= 14;
  var cls = (0, _classnames2.default)({
    'prev-month': prevMonth,
    'next-month': nextMonth,
    'current-day': !prevMonth && !nextMonth && selected
  });

  return _react2.default.createElement(
    'td',
    _extends({ className: cls }, props),
    weekDay
  );
};

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref2, [this].concat(args))), _this), _this.selectDate = function (weekDay, weekNumber) {
      var prevMonth = weekNumber === 0 && weekDay > 7;
      var nextMonth = weekNumber >= 4 && weekDay <= 14;
      var m = _this.props.moment;

      m.date(weekDay);
      if (prevMonth) m.subtract(1, 'month');
      if (nextMonth) m.add(1, 'month');

      _this.props.onChange(m);
    }, _this.prevMonth = function (e) {
      e.preventDefault();
      _this.props.onChange(_this.props.moment.subtract(1, 'month'));
    }, _this.nextMonth = function (e) {
      e.preventDefault();
      _this.props.onChange(_this.props.moment.add(1, 'month'));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var m = this.props.moment;
      var date = m.date();

      var monthStartWeekDay = m.clone().startOf('month').format('e');
      var monthEndWeekDay = m.clone().endOf('month').format('e');
      var dateStart = monthStartWeekDay === 0 ? m.clone().startOf('month') : m.clone().startOf('month').subtract(monthStartWeekDay, 'days');
      var dateEnd = monthEndWeekDay === 6 ? m.clone().endOf('month') : m.clone().endOf('month').add(6 - monthEndWeekDay, 'days');
      var daysRange = moment.range(dateStart, dateEnd);

      var days = Array.from(daysRange.by('day'));
      var weekRange = moment.range(m.clone().startOf('week'), m.clone().endOf('week'));
      var weeks = Array.from(weekRange.by('day'));

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('m-calendar', this.props.className) },
        _react2.default.createElement(
          'div',
          { className: 'toolbar' },
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'prev-month', onClick: this.prevMonth },
            _react2.default.createElement('i', { className: this.props.prevMonthIcon })
          ),
          _react2.default.createElement(
            'span',
            { className: 'current-date' },
            m.format('MMMM YYYY')
          ),
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'next-month', onClick: this.nextMonth },
            _react2.default.createElement('i', { className: this.props.nextMonthIcon })
          )
        ),
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              weeks.map(function (day) {
                var dayName = day.format('ddd');
                return _react2.default.createElement(
                  'td',
                  { key: dayName },
                  dayName
                );
              })
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            (0, _chunk2.default)(days, 7).map(function (row, weekNumber) {
              return _react2.default.createElement(
                'tr',
                { key: weekNumber },
                row.map(function (momentWeekDay) {
                  var weekDay = +momentWeekDay.format('D');
                  var selected = weekDay === date;
                  return _react2.default.createElement(Day, {
                    key: weekDay,
                    weekDay: weekDay,
                    selected: selected,
                    weekNumber: weekNumber,
                    onClick: function onClick() {
                      return _this2.selectDate(weekDay, weekNumber);
                    }
                  });
                })
              );
            })
          )
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

exports.default = Calendar;
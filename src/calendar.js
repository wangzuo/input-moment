var cx = require('classnames');
var blacklist = require('blacklist');
var moment = require('moment');
var React = require('react');
var range = require('lodash/utility/range');
var chunk = require('lodash/array/chunk');

var Day = React.createClass({
  displayName: 'Day',

  render() {
    var i = this.props.i;
    var w = this.props.w;
    var prevMonth = (w === 0 && i > 7);
    var nextMonth = (w >= 4 && i <= 14);
    var props = blacklist(this.props, 'i', 'w', 'd', 'className');
    props.className = cx({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current-day': !prevMonth && !nextMonth && (i === this.props.d)
    });

    return <td {... props}>{i}</td>;
  }
});

module.exports = React.createClass({
  displayName: 'Calendar',

  render() {
    var m = this.props.moment;
    var d = m.date();
    var d1 = m.clone().subtract(1, 'month').endOf('month').date();
    var d2 = m.clone().date(1).day();
    var d3 = m.clone().endOf('month').date();

    var days = [].concat(
      range(d1-d2+1, d1+1),
      range(1, d3+1),
      range(1, 42-d3-d2+1)
    );

    var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className={cx('m-calendar', this.props.className)}>
        <div className="toolbar">
          <button type="button" className="prev-month" onClick={this.prevMonth}>
            <i className={this.props.prevMonthIcon}/>
          </button>
          <span className="current-date">{m.format('MMMM YYYY')}</span>
          <button type="button" className="next-month" onClick={this.nextMonth}>
            <i className={this.props.nextMonthIcon}/>
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {weeks.map((w, i) => <td key={i}>{w}</td>)}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) => (
              <tr key={w}>
                {row.map((i) => (
                  <Day key={i} i={i} d={d} w={w}
                    onClick={this.selectDate.bind(null, i, w)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },

  selectDate(i, w) {
    var prevMonth = (w === 0 && i > 7);
    var nextMonth = (w >= 4 && i <= 14);
    var m = this.props.moment;

    m.date(i);
    if(prevMonth) m.subtract(1, 'month');
    if(nextMonth) m.add(1, 'month');

    this.props.onChange(m);
  },

  prevMonth(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'month'));
  },

  nextMonth(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'month'));
  }
});

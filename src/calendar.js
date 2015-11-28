var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var range = require('./range');
require('./chunk');

var Day = React.createClass({
  displayName: 'Day',

  render() {
    var i = this.props.i;
    var w = this.props.w;
    var prevMonth = (w === 0 && i > 7);
    var nextMonth = (w >= 4 && i <= 14);
    var cn = cx({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current-day': !prevMonth && !nextMonth && (i === this.props.d)
    });

    return <td className={cn} {... this.props}>{i}</td>;
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
      range(d1-d2+1, d1),
      range(1, d3),
      range(1, 42-d3-d2)
    );

    var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className={cx('m-calendar', this.props.className)}>
        <div className="toolbar">
          <button className="prev-month" onClick={this.prevMonth}>
            <i className="ion-ios-arrow-left"/>
          </button>
          <span className="current-date">{m.format('MMMM YYYY')}</span>
          <button className="next-month" onClick={this.nextMonth}>
            <i className="ion-ios-arrow-right"/>
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {weeks.map((w, i) => <td key={i}>{w}</td>)}
            </tr>
          </thead>

          <tbody>
            {days.chunk(7).map((row, w) => (
              <tr key={w}>
                {row.map((i) => (
                  <Day key={i} i={i} d={d} w={w}
                    onClick={this.selectDate.bind(null, i)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },

  selectDate(i) {
    this.props.onChange(this.props.moment.date(i));
  },

  prevMonth() {
    this.props.onChange(this.props.moment.subtract(1, 'month'));
  },

  nextMonth() {
    this.props.onChange(this.props.moment.add(1, 'month'));
  }
});

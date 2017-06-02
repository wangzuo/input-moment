var cx = require('classnames');
var blacklist = require('blacklist');
var Moment = require('moment');
var MomentRange = require('moment-range');
var moment = MomentRange.extendMoment(Moment);

var React = require('react');
var range = require('lodash/range');
var chunk = require('lodash/chunk');

var Day = React.createClass({
  displayName: 'Day',

  render() {
    var weekDay = this.props.weekDay;
    var week = this.props.week;
    var prevMonth = (week === 0 && weekDay > 7);
    var nextMonth = (week >= 4 && weekDay <= 14);
    var props = blacklist(this.props, 'weekDay', 'week', 'date', 'className');
    props.className = cx({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current-day': !prevMonth && !nextMonth && (weekDay === this.props.date)
    });

    return <td {... props}>{weekDay}</td>;
  }
});

module.exports = React.createClass({
  displayName: 'Calendar',

  render() {
    var m = this.props.moment;
    var date = m.date();

    var dayStart = m.clone().startOf('month').isoWeekday();
    var dayEnd = m.clone().endOf('month').isoWeekday();
    var dateStart = dayStart === 1 ? m.clone().startOf('month') : m.clone().startOf('month').subtract(dayStart-1, 'days');
    var dateEnd = dayEnd === 7 ? m.clone().endOf('month') : m.clone().endOf('month').add(7-dayEnd, 'days');
    var daysRange = moment.range(dateStart, dateEnd);
    
    var days = Array.from(daysRange.by('day'));
    var weekRange = moment.range(m.clone().startOf('week'), m.clone().endOf('week'));
    var weeks = Array.from(weekRange.by('day'));

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
              {weeks.map((day) => { 
                var dayName = day.format('ddd');
                return <td key={dayName}>{dayName}</td>
              })}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, week) => (
              <tr key={week}>
                {row.map((momentWeekDay) => {
                  const weekDay = momentWeekDay.format('D');
                  return (
                    <Day key={weekDay} weekDay={weekDay} date={date} week={week}
                      onClick={this.selectDate.bind(null, weekDay, week)}
                    />
                  )}
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },

  selectDate(weekDay, week) {
    var prevMonth = (week === 0 && weekDay > 7);
    var nextMonth = (week >= 4 && weekDay <= 14);
    var m = this.props.moment;

    m.date(weekDay);
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

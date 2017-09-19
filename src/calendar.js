import React, { Component } from 'react';
import cx from 'classnames';
import chunk from 'lodash/chunk';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const Day = ({ weekDay, weekNumber, selected, className, ...props }) => {
  const prevMonth = weekNumber === 0 && weekDay > 7;
  const nextMonth = weekNumber >= 4 && weekDay <= 14;
  const cls = cx({
    'prev-month': prevMonth,
    'next-month': nextMonth,
    'current-day': !prevMonth && !nextMonth && selected
  });

  return <td className={cls} {...props}>{weekDay}</td>;
};

export default class Calendar extends Component {
  selectDate = (weekDay, weekNumber) => {
    const prevMonth = weekNumber === 0 && weekDay > 7;
    const nextMonth = weekNumber >= 4 && weekDay <= 14;
    const m = this.props.moment;

    m.date(weekDay);
    if (prevMonth) m.subtract(1, 'month');
    if (nextMonth) m.add(1, 'month');

    this.props.onChange(m);
  };

  prevMonth = e => {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'month'));
  };

  nextMonth = e => {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'month'));
  };

  render() {
    const m = this.props.moment;
    const date = m.date();

    const monthStartWeekDay = m.clone().startOf('month').format('e');
    const monthEndWeekDay = m.clone().endOf('month').format('e');
    const dateStart = monthStartWeekDay === 0 ? m.clone().startOf('month') : m.clone().startOf('month').subtract(monthStartWeekDay, 'days');
    const dateEnd = monthEndWeekDay === 6 ? m.clone().endOf('month') : m.clone().endOf('month').add(6-monthEndWeekDay, 'days');
    const daysRange = moment.range(dateStart, dateEnd);
    
    const days = Array.from(daysRange.by('day'));
    const weekRange = moment.range(m.clone().startOf('week'), m.clone().endOf('week'));
    const weeks = Array.from(weekRange.by('day'));

    return (
      <div className={cx('m-calendar', this.props.className)}>
        <div className="toolbar">
          <button type="button" className="prev-month" onClick={this.prevMonth}>
            <i className={this.props.prevMonthIcon} />
          </button>
          <span className="current-date">{m.format('MMMM YYYY')}</span>
          <button type="button" className="next-month" onClick={this.nextMonth}>
            <i className={this.props.nextMonthIcon} />
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {weeks.map((day) => { 
                const dayName = day.format('ddd');
                return <td key={dayName}>{dayName}</td>
              })}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, weekNumber) =>
              <tr key={weekNumber}>
                {row.map(momentWeekDay => {
                  const weekDay = +momentWeekDay.format('D');
                  const selected = weekDay === date;
                  return (
                    <Day
                      key={weekDay}
                      weekDay={weekDay}
                      selected={selected}
                      weekNumber={weekNumber}
                      onClick={() => this.selectDate(weekDay, weekNumber)}
                    />
                  );
                }
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

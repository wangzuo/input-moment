import moment from 'moment';
import React, { Component } from 'react';
import cx from 'classnames';
import range from 'lodash/range';
import chunk from 'lodash/chunk';

const Day = ({ i, w, d, minDate, maxDate, currentMoment, className, ...props }) => {
  const prevMonth = w === 0 && i > 7;
  const nextMonth = w >= 4 && i <= 14;
  const currentMomentCopy = moment();

  if (nextMonth) {
    currentMomentCopy.set('month', currentMoment.month() + 1);
  }

  const cls = cx({
    'prev-month': prevMonth,
    'next-month': nextMonth,
    'current-day': !prevMonth && !nextMonth && i === d,
    'disabled-day': minDate ? i < minDate.date() && currentMomentCopy.month() === currentMoment.month() : false ||
      maxDate ? i > maxDate.date() : false
  });

  return <td className={cls} {...props}>{i}</td>;
};

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: this.props.moment
    }
  }
  selectDate = (i, w) => {
    const prevMonth = w === 0 && i > 7;
    const nextMonth = w >= 4 && i <= 14;
    const m = this.props.moment;

    if (prevMonth) {
      m.subtract(1, 'month');
    }

    if (nextMonth) {
      m.add(1, 'month');
    }

    m.date(i);

    this.props.onChange(m);
  };

  prevMonth = e => {
    e.preventDefault();
    const minDate = this.props.minDate;

    if (!this.props.moment.isBefore(minDate) && !this.props.moment.isSame(minDate)) {
      this.props.onChange(this.props.moment.subtract(1, 'month'));      
    }
  };

  nextMonth = e => {
    e.preventDefault();
    const maxDate = this.props.maxDate;

    console.log('this.props.moment.isAfter(maxDate)', this.props.moment.isAfter(maxDate));
    console.log('this.props.moment.isSame(maxDate, month)', this.props.moment.isSame(maxDate, 'month')); 
    console.log('this.props.moment.isSame(maxDate, day)', this.props.moment.isSame(maxDate, 'day'));        

    if (!this.props.moment.isAfter(maxDate) && !this.props.moment.isSame(maxDate)) {
      this.props.onChange(this.props.moment.add(1, 'month'));

      console.log('this.props.moment', this.props.moment);      
      console.log('this.props.moment.isAfter(maxDate)', this.props.moment.isAfter(maxDate));
      console.log('this.props.moment.isSame(maxDate, month)', this.props.moment.isSame(maxDate, 'month')); 
      console.log('this.props.moment.isSame(maxDate, day)', this.props.moment.isSame(maxDate, 'day')); 
    }
  };

  render() {
    const minDate = this.props.minDate;
    const maxDate = this.props.maxDate;
    const currentMoment = this.props.moment;
    const m = this.props.moment;
    const d = m.date();
    const month = m.month();
    const year = m.year();
    const d1 = m.clone().subtract(1, 'month').endOf('month').date();
    const d2 = m.clone().date(1).day();
    const d3 = m.clone().endOf('month').date();
    const days = [].concat(
      range(d1 - d2 + 1, d1 + 1),
      range(1, d3 + 1),
      range(1, 42 - d3 - d2 + 1)
    );
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className={cx('m-calendar', this.props.className)}>
        <div className="toolbar">
          <button 
            type="button"
            className={
              cx({
                'prev-month': true,
                'prev-month-disabled': currentMoment.isBefore(minDate) || currentMoment.isSame(minDate, 'day') && currentMoment.isSame(mindate, 'month')
              })
            }
            onClick={this.prevMonth}
            disabled={currentMoment.isBefore(minDate) || currentMoment.isSame(minDate, 'day') && currentMoment.isSame(minDate, 'month')}
            >
            <i className={this.props.prevMonthIcon} />
          </button>
          <span className="current-date">{m.format('MMMM YYYY')}</span>
          <button 
            type="button"
            className={
              cx({
                'next-month': true,
                'next-month-disabled': currentMoment.isAfter(maxDate) || currentMoment.isSame(maxDate, 'day') && currentMoment.isSame(maxDate, 'month')
              })
            }
            onClick={this.nextMonth}
            disabled={currentMoment.isAfter(maxDate) || currentMoment.isSame(maxDate, 'day') && currentMoment.isSame(maxDate, 'month')}
            >
            <i className={this.props.nextMonthIcon} />
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {weeks.map((w, i) => <td key={i}>{w}</td>)}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) =>
              <tr key={w}>
                {row.map(i => {
                  return <Day
                    key={i}
                    i={i}
                    d={d}
                    w={w}
                    minDate={minDate}
                    maxDate={maxDate}
                    currentMoment={currentMoment}
                    onClick={() => this.selectDate(i, w)}
                  />
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

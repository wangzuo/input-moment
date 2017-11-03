import moment from 'moment';
import React, { Component } from 'react';
import cx from 'classnames';
import range from 'lodash/range';
import chunk from 'lodash/chunk';

const isDisabledDay = (currentMoment, minDate, maxDate) => currentMoment.isBefore(minDate, 'day') || currentMoment.isAfter(maxDate, 'day');

const Day = ({ i, w, d, minDate, maxDate, currentMoment, className, ...props }) => {
  const prevMonth = w === 0 && i > 7;
  const nextMonth = w >= 4 && i <= 14;
  const currentMomentCopy = moment(currentMoment); // Moment clone.

  if (prevMonth) {
    currentMomentCopy.subtract(1, 'month');
  }

  if (nextMonth) {
    currentMomentCopy.add(1, 'month');
  }

  currentMomentCopy.date(i); 

  const cls = cx({
    'prev-month': prevMonth,
    'next-month': nextMonth,
    'current-day': !prevMonth && !nextMonth && i === d,
    'disabled-day': minDate || maxDate ? isDisabledDay(currentMomentCopy, minDate, maxDate) : false
  });

  if (isDisabledDay(currentMomentCopy, minDate, maxDate)) {
    return <td className={cls} {...props} onClick={() => null}>{i}</td>;    
  } else {
    return <td className={cls} {...props}>{i}</td>;
  }
};

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: this.props.moment,
      previousMonthShouldBeDisabled: false,
      nextMonthShouldBeDisabled: false
    }
  }

  componentDidMount() {
    this.previousMonthShouldBeDisabled(this.state.currentTime);
    this.nextMonthShouldBeDisabled(this.state.currentTime);
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
    this.previousMonthShouldBeDisabled(this.state.currentTime);
    this.nextMonthShouldBeDisabled(this.state.currentTime);
  };

  prevMonth = e => {
    e.preventDefault();
    const minDate = this.props.minDate;

    this.props.onChange(this.props.moment.subtract(1, 'month'));
    this.previousMonthShouldBeDisabled(this.state.currentTime);
    this.nextMonthShouldBeDisabled(this.state.currentTime);
  };

  nextMonth = e => {
    e.preventDefault();
    const maxDate = this.props.maxDate;

    this.props.onChange(this.props.moment.add(1, 'month'));
    this.previousMonthShouldBeDisabled(this.state.currentTime);
    this.nextMonthShouldBeDisabled(this.state.currentTime);
  };

  previousMonthShouldBeDisabled = currentMoment => {
    const currentMomentCopy = moment(currentMoment);

    currentMomentCopy.subtract(1, 'month');
    currentMomentCopy.endOf('month');
 
    this.setState({
      previousMonthShouldBeDisabled: currentMomentCopy.isBefore(this.props.minDate)
    });
  }

  nextMonthShouldBeDisabled = currentMoment => {
    const currentMomentCopy = moment(currentMoment);

    currentMomentCopy.add(1, 'month');
    currentMomentCopy.startOf('month');

    this.setState({
      nextMonthShouldBeDisabled: currentMomentCopy.isAfter(this.props.maxDate)
    });
  }

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
                'prev-month-disabled': this.state.previousMonthShouldBeDisabled
              })
            }
            onClick={this.prevMonth}
            disabled={this.state.previousMonthShouldBeDisabled}
            >
            <i className={this.props.prevMonthIcon} />
          </button>
          <span className="current-date">{m.format('MMMM YYYY')}</span>
          <button 
            type="button"
            className={
              cx({
                'next-month': true,
                'next-month-disabled': this.state.nextMonthShouldBeDisabled
              })
            }
            onClick={this.nextMonth}
            disabled={this.state.nextMonthShouldBeDisabled}
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

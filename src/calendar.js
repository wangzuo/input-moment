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
    // We overwrite the onClick function with a function which returns null (do nothing).
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
      prevMonthShouldBeDisabled: false,
      nextMonthShouldBeDisabled: false
    }

    this.selectDate = this.selectDate.bind(this);
    this.prevMonth = this.prevMonth.bind(this);    
    this.prevMonthShouldBeDisabled = this.prevMonthShouldBeDisabled.bind(this);
    this.nextMonth = this.nextMonth.bind(this);    
    this.nextMonthShouldBeDisabled = this.nextMonthShouldBeDisabled.bind(this);
    this.setCurrentTime = this.setCurrentTime.bind(this);
  }

  componentDidMount() {
    this.prevMonthShouldBeDisabled(this.state.currentTime);
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
    this.prevMonthShouldBeDisabled(this.state.currentTime);
    this.nextMonthShouldBeDisabled(this.state.currentTime);
  };

  prevMonth = e => {
    e.preventDefault();
    const momentCopy = this.props.moment;
    const { minDate } = this.props;

    momentCopy.subtract(1, 'month');

    if (momentCopy.isBefore(minDate, 'day')) {
      momentCopy.endOf('month');
    }

    this.props.onChange(this.setCurrentTime(momentCopy));          
    this.prevMonthShouldBeDisabled(this.state.currentTime);
    this.nextMonthShouldBeDisabled(this.state.currentTime);
  };


  prevMonthShouldBeDisabled = currentMoment => {
    const currentMomentCopy = moment(currentMoment);

    currentMomentCopy.subtract(1, 'month');
    currentMomentCopy.endOf('month');
 
    this.setState({
      prevMonthShouldBeDisabled: currentMomentCopy.isBefore(this.props.minDate)
    });
  };

  nextMonth = e => {
    e.preventDefault();
    const momentCopy = this.props.moment;
    const { maxDate } = this.props;

    momentCopy.add(1, 'month');

    if (momentCopy.isAfter(maxDate, 'day')) {
      momentCopy.startOf('month');
    }

    this.props.onChange(this.setCurrentTime(momentCopy));
    this.prevMonthShouldBeDisabled(this.state.currentTime);
    this.nextMonthShouldBeDisabled(this.state.currentTime);
  };

  nextMonthShouldBeDisabled = currentMoment => {
    const currentMomentCopy = moment(currentMoment);

    currentMomentCopy.add(1, 'month');
    currentMomentCopy.startOf('month');

    this.setState({
      nextMonthShouldBeDisabled: currentMomentCopy.isAfter(this.props.maxDate)
    });
  };

  setCurrentTime = m => {
    m.hours(moment().hours());
    m.minutes(moment().minutes());
    m.seconds(moment().seconds());
    m.milliseconds(moment().milliseconds());

    return m;
  }

  render() {
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
    const minDate = this.props.minDate;
    const maxDate = this.props.maxDate;

    return (
      <div className={cx('m-calendar', this.props.className)}>
        <div className="toolbar">
          <button 
            type="button"
            className={
              cx({
                'prev-month': true,
                'prev-month-disabled': this.state.prevMonthShouldBeDisabled
              })
            }
            onClick={this.prevMonth}
            disabled={this.state.prevMonthShouldBeDisabled}
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
                    onClick={() => this.selectDate(i, w)}
                    minDate={minDate}
                    maxDate={maxDate}
                    currentMoment={m}
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

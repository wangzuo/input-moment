import moment from 'moment';
import React, { Component } from 'react';
import cx from 'classnames';
import range from 'lodash/range';
import chunk from 'lodash/chunk';

const Day = ({ i, w, d, className, selected, month, isValid, selectDate, ...props }) => {
  const prevMonth = w === 0 && i > 7;
  const nextMonth = w >= 4 && i <= 14;
  const m = moment(month);
  if(prevMonth) m.subtract(1, 'month');
  if(nextMonth) m.add(1, 'month');
  m.date(i);
  var valid = isValid(m);

  const cls = cx({
    'prev-month': prevMonth,
    'next-month': nextMonth,
    'current-day': !prevMonth && !nextMonth && i === d,
    'valid': valid,
    'invalid': !valid
  });

  return <td className={cls} onClick={() => selectDate(m)} {...props}>{i}</td>;
};

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    // The inital month shown on the calendar is the month of the current moment
    this.state = {month: moment(this.props.moment).startOf('month')};
  }
  selectDate = selectMoment => {
    var m = moment(this.props.moment);
    m.year(selectMoment.year()).month(selectMoment.month()).date(selectMoment.date());

    if(this.props.isValid(m)) {
      this.setState({month: moment(m).startOf('month')});
      this.props.onChange(m);
    }
  }

  prevMonth = e => {
    e.preventDefault();
    this.setState({month: moment(this.state.month).subtract(1, 'month')});
  };

  nextMonth = e => {
    e.preventDefault();
    this.setState({month: moment(this.state.month).add(1, 'month')});
  };

  render() {
    const m = this.props.moment;
    var month = this.state.month;
    const d = m.date();
    const d1 = month.clone().subtract(1, 'month').endOf('month').date();
    const d2 = month.clone().date(1).day();
    const d3 = month.clone().endOf('month').date();
    const days = [].concat(
      range(d1 - d2 + 1, d1 + 1),
      range(1, d3 + 1),
      range(1, 42 - d3 - d2 + 1)
    );
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className={cx('m-calendar', this.props.className)}>
        <div className="toolbar">
          <button type="button" className="prev-month" onClick={this.prevMonth}>
            <i className={this.props.prevMonthIcon} />
          </button>
          <span className="current-date">{month.format('MMMM YYYY')}</span>
          <button type="button" className="next-month" onClick={this.nextMonth}>
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
                {row.map(i =>
                  <Day
                    key={i}
                    i={i}
                    d={d}
                    w={w}
                    month={month}
                    selected={m}
                    isValid={this.props.isValid}
                    selectDate={this.selectDate}
                  />
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

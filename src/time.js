import cx from 'classnames';
import React, { Component } from 'react';
import InputSlider from 'react-input-slider';

export default class extends Component {
  changeHours = pos => {
    const m = this.props.moment;
    m.hours(pos.x);
    this.props.onChange(m);
  };

  changeMinutes = pos => {
    const m = this.props.moment;
    m.minutes(pos.x);
    this.props.onChange(m);
  };

  render() {
    const m = this.props.moment;

    return (
      <div className={cx('input-moment-m-time', this.props.className)}>
        <div className="input-moment-showtime">
          <span className="input-moment-time">{m.format('HH')}</span>
          <span className="input-moment-separater">:</span>
          <span className="input-moment-time">{m.format('mm')}</span>
        </div>

        <div className="input-moment-sliders">
          <div className="input-moment-time-text">Hours:</div>
          <InputSlider
            className="input-moment-u-slider-time"
            xmin={0}
            xmax={23}
            xstep={this.props.hourStep}
            x={m.hour()}
            onChange={this.changeHours}
          />
          <div className="input-moment-time-text">Minutes:</div>
          <InputSlider
            className="input-moment-u-slider-time"
            xmin={0}
            xmax={59}
            xstep={this.props.minStep}
            x={m.minute()}
            onChange={this.changeMinutes}
          />
        </div>
      </div>
    );
  }
}

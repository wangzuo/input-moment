var cx = require('classnames');
var React = require('react');
var InputSlider = require('react-input-slider');

module.exports = React.createClass({
  displayName: 'Time',

  render() {
    var m = this.props.moment;

    return (
      <div className={cx('m-time', this.props.className)}>
        <div className="showtime">
          <span className="time">{m.hour()}</span>
          <span>:</span>
          <span className="time">{m.minute()}</span>
        </div>

        <div>
          <div>Hours</div>
          <InputSlider xmin={0} xmax={23} x={m.hour()} onChange={this.changeHours}/>
          <div>Minutes</div>
          <InputSlider xmin={0} xmax={59} x={m.minute()} onChange={this.changeMinutes}/>
        </div>
      </div>
    );
  },

  changeHours(pos) {
    var m = this.props.moment;
    m.hours(parseInt(pos.x, 10));
    this.props.onChange(m);
  },

  changeMinutes(pos) {
    var m = this.props.moment;
    m.minutes(parseInt(pos.x, 10));
    this.props.onChange(m);
  }
});

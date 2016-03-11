var React = require('react');
var cx = require('classnames');

module.exports = React.createClass({
  render() {
    var dateOnly = this.props.dateOnly;
    var timeOnly = this.props.timeOnly;
    var handleClickTab = this.props.handleClickTab;
    var tab = this.props.tab;
    if (timeOnly || dateOnly) {
      return <div/>;
    }
    return (
      <div className="options">
        <button type="button" className={cx('ion-calendar im-btn', {'is-active': tab === 0})} onClick={handleClickTab.bind(null, 0)}>
          Date
        </button>
        <button type="button" className={cx('ion-clock im-btn', {'is-active': tab === 1})} onClick={handleClickTab.bind(null, 1)}>
          Time
        </button>
      </div>
    );
  }
});

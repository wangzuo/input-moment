var moment = require('moment');
var React = require('react');
var Tabs = require('./tabs');
var Options = require('./options');

module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState() {
    return {
      tab: 0
    };
  },

  getDefaultProps() {
    return {
      prevMonthIcon: 'ion-ios-arrow-left',
      nextMonthIcon: 'ion-ios-arrow-right',
      weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      locale: 'en',
      saveString: 'Save',
      dateOnly: false,
      timeOnly: false
    };
  },

  render() {
    var tab = this.state.tab;
    var m = this.props.moment;

    return (
      <div className="m-input-moment">

        <Options
          tab={tab}
          handleClickTab={this.handleClickTab}
          dateOnly={this.props.dateOnly}
          timeOnly={this.props.timeOnly}
        />

        <Tabs
          tab={tab}
          m={m}
          locale={this.props.locale}
          weeks={this.props.weeks}
          dateOnly={this.props.dateOnly}
          timeOnly={this.props.timeOnly}
          prevMonthIcon={this.props.prevMonthIcon}
          nextMonthIcon={this.props.nextMonthIcon}
          onChange={this.props.onChange}
        />

        <button type="button" className="im-btn btn-save ion-checkmark"
          onClick={this.handleSave}>
          {this.props.saveString}
        </button>
      </div>
    );
  },

  handleClickTab(tab, e) {
    e.preventDefault();
    this.setState({tab: tab});
  },

  handleSave(e) {
    e.preventDefault();
    if(this.props.onSave) this.props.onSave();
  }
});

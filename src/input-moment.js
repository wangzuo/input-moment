import cx from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import Calendar from './calendar';
import Time from './time';

export default class InputMoment extends Component {
  static defaultProps = {
    prevMonthIcon: 'ion-ios-arrow-left',
    nextMonthIcon: 'ion-ios-arrow-right',
    minStep: 1,
    hourStep: 1,
    tab: 0
  };

  state = {
    tab: this.props.tab || 0
  };

  handleClickTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab: tab });
  };

  handleSave = e => {
    e.preventDefault();
    if (this.props.onSave) this.props.onSave();
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.tab !== nextProps.tab) this.setState({tab});
  };

  render() {
    const activeTab = this.state.tab;
    const {
      moment: m,
      className,
      prevMonthIcon,
      nextMonthIcon,
      minStep,
      hourStep,
      onSave,
      tab,
      ...props
    } = this.props;

    const cls = cx('m-input-moment', className);
    const dateActive = { 'is-active': activeTab === 0 };
    const timeActive = { 'is-active': activeTab === 1 };

    return (
      <div className={cls} {...props}>
        <div className="options">
          <button
            type="button"
            className={cx('ion-calendar im-btn', dateActive)}
            onClick={e => this.handleClickTab(e, 0)}
          >
            Date
          </button>
          <button
            type="button"
            className={cx('ion-clock im-btn', timeActive)}
            onClick={e => this.handleClickTab(e, 1)}
          >
            Time
          </button>
        </div>

        <div className="tabs">
          <Calendar
            className={cx('tab', dateActive)}
            moment={m}
            onChange={this.props.onChange}
            prevMonthIcon={this.props.prevMonthIcon}
            nextMonthIcon={this.props.nextMonthIcon}
          />
          <Time
            className={cx('tab', timeActive)}
            moment={m}
            minStep={this.props.minStep}
            hourStep={this.props.hourStep}
            onChange={this.props.onChange}
          />
        </div>

        {this.props.onSave ? (
          <button
            type="button"
            className="im-btn btn-save ion-checkmark"
            onClick={this.handleSave}
          >
            Save
          </button>
        ) : null}
      </div>
    );
  }
}

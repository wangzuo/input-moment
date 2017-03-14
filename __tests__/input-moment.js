import moment from 'moment';
import React from 'react';
import renderer from 'react-test-renderer';
import InputMoment from '../src/input-moment';

test('render', () => {
  const m = moment().year(2018).hours(8).minutes(20).seconds(0);
  const component = <InputMoment moment={m} />;
  expect(renderer.create(component).toJSON()).toMatchSnapshot();
});

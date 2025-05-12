import {render} from '@testing-library/react-native';
import React from 'react';
import Loading from '..';

describe('Loading Component', () => {
  // it('should render the ActivityIndicator', () => {
  //   const {getByTestId} = render(<Loading />);
  //   const activityIndicator = getByTestId('activity-indicator');
  //   expect(activityIndicator).toBeTruthy();
  //   expect(activityIndicator.props.size).toBe('large');
  //   expect(activityIndicator.props.color).toBe('#0000ff');
  // });

  it('should render the loading text', () => {
    const {getByText} = render(<Loading />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const {toJSON} = render(<Loading />);
    expect(toJSON()).toMatchSnapshot();
  });
});

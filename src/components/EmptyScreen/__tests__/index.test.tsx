import {render} from '@testing-library/react-native';
import React from 'react';
import EmptyScreen from '..';

describe('EmptyScreen Component', () => {
  it('should render with the default message', () => {
    const {getByText} = render(<EmptyScreen />);
    expect(getByText('No Data available')).toBeTruthy();
  });

  it('should render with a custom message', () => {
    const customMessage = 'No albums found';
    const {getByText} = render(<EmptyScreen message={customMessage} />);
    expect(getByText(customMessage)).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const {toJSON} = render(<EmptyScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});

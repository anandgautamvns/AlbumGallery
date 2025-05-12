import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ErrorScreen from '..';

describe('ErrorScreen Component', () => {
  const mockError = new Error('Test error message');
  const mockOnRetry = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render with the default error message when no error is provided', () => {
    const {getByText} = render(<ErrorScreen error={null} />);
    expect(getByText('Something went wrong.')).toBeTruthy();
  });

  it('should render with the provided error message', () => {
    const {getByText} = render(<ErrorScreen error={mockError} />);
    expect(getByText('Test error message')).toBeTruthy();
  });

  it('should render the Retry button when onRetry is provided', () => {
    const {getByText} = render(
      <ErrorScreen error={mockError} onRetry={mockOnRetry} />,
    );
    expect(getByText('Retry')).toBeTruthy();
  });

  it('should call onRetry when the Retry button is pressed', () => {
    const {getByText} = render(
      <ErrorScreen error={mockError} onRetry={mockOnRetry} />,
    );
    fireEvent.press(getByText('Retry'));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('should match the snapshot', () => {
    const {toJSON} = render(
      <ErrorScreen error={mockError} onRetry={mockOnRetry} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

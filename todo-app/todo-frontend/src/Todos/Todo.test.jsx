import React from 'react';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders testing text', () => {
  const todo = { text: 'Testing todo' };
  render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />);
  expect(screen.getByText("Testing todo")).toBeInTheDocument();
});
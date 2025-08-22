import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('renders app header', () => {
  render(<App />);
  expect(screen.getByText(/GitHub Analytics Dashboard/i)).toBeInTheDocument();
});

test('shows error message on 404 user not found', async () => {
  axios.get.mockRejectedValueOnce({ response: { status: 404 } });
  render(<App />);
  expect(await screen.findByText(/User not found/i)).toBeInTheDocument();
});



import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { useNavigate } from 'react-router-dom';
import { signup } from '../../src/services/authentication';

import { SignupPage } from '../../src/pages/Signup/SignupPage';

// Mocking React Router's useNavigate function
vi.mock('react-router-dom', () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

// Mocking the signup service
vi.mock('../../src/services/authentication', () => {
  const signupMock = vi.fn();
  return { signup: signupMock };
});

// Reusable function for filling out signup form
const completeSignupForm = async () => {
  const user = userEvent.setup();
  const usernameInputEl = screen.getByLabelText('Username:')
  const emailInputEl = screen.getByLabelText('Email:');
  const passwordInputEl = screen.getByLabelText('Password:');
  const submitButtonEl = screen.getByRole('submit-button');
  await user.type(usernameInputEl, 'username')
  await user.type(emailInputEl, 'test@email.com');
  await user.type(passwordInputEl, '12345678');
  await user.click(submitButtonEl);
};

describe('Signup Page', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('allows a user to signup', async () => {
    render(<SignupPage />);

    await completeSignupForm();

    expect(signup).toHaveBeenCalledWith('username', 'test@email.com', '12345678');
  });

  test('navigates to / on successful signup', async () => {
    render(<SignupPage />);

    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});

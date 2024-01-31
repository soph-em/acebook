import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NewPost from '../../src/components/Post/NewPost';

describe('NewPost component', () => {
  // Test case: Ensures that the onNewPost callback is called with the correct data when the form is submitted.
  it('calls onNewPost with the post message when submitted', () => {
    // Mock function to simulate the onNewPost callback
    const mockOnNewPost = vi.fn();

    // Renders the NewPost component for testing.
    // getByPlaceholderText and getByRole are used to query DOM elements.
    const { getByPlaceholderText, getByRole } = render(
      <NewPost onNewPost={mockOnNewPost} />
    );

    // Simulates user typing in the textarea.
    // getByPlaceholderText finds the textarea using its placeholder text.
    fireEvent.change(getByPlaceholderText(/Enter text here/i), {
      target: { value: 'Test post' },
    });

    // Simulates a click on the submit button.
    // getByRole finds the button by its role and accessible name.
    fireEvent.click(getByRole('button', { name: /post/i }));

    // Asserts that the mock function was called with the expected argument.
    expect(mockOnNewPost).toHaveBeenCalledWith('Test post');
  });
  it('does not call onNewPost when submitted with empty textarea', () => {
    const mockOnNewPost = vi.fn();
    const { getByRole } = render(<NewPost onNewPost={mockOnNewPost} />);

    fireEvent.click(getByRole('button', { name: /post/i }));

    expect(mockOnNewPost).not.toHaveBeenCalled();
  });
  it('clears the textarea after successful submission', () => {
    const mockOnNewPost = vi.fn();
    const { getByPlaceholderText, getByRole } = render(
      <NewPost onNewPost={mockOnNewPost} />
    );

    const textarea = getByPlaceholderText(/enter text here/i);
    fireEvent.change(textarea, { target: { value: 'Test post' } });
    fireEvent.click(getByRole('button', { name: /post/i }));

    expect(textarea.value).toBe('');
  });
});

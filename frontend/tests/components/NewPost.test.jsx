import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NewPost from '../../src/components/Post/NewPost';

// Mock the UploadWidget component
vi.mock('../../src/components/Post/UploadWidget', () => {
  return {
    __esModule: true,
    default: ({ onImageUpload }) => {
      // Simulate the behavior of the UploadWidget component
      return (
        <button id="upload-button" onClick={() => onImageUpload('mockedImageUrl')}>
          Upload Image
        </button>
      );
    },
  };
});

describe('NewPost component', () => {
  let mockOnNewPost 
  beforeEach(() => {
    mockOnNewPost = vi.fn();
  })
  //reset mock after each test:
  afterEach(() => {
    vi.clearAllMocks()
  })
  

  it('calls onNewPost with the post message when submitted', () => {
    const { getByPlaceholderText, getByRole } = render(
      <NewPost onNewPost={mockOnNewPost} />
    );

    fireEvent.change(getByPlaceholderText(/brilliance/i), {
      target: { value: 'Test post' },
    });

    fireEvent.click(getByRole('button', { name: /post/i }));

    expect(mockOnNewPost).toHaveBeenCalledWith('Test post', null);
  });

  it('does not call onNewPost when submitted with empty textarea', () => {
    const { getByRole } = render(<NewPost onNewPost={mockOnNewPost} />);

    fireEvent.click(getByRole('button', { name: /post/i }));

    expect(mockOnNewPost).not.toHaveBeenCalled();
  });

  it('clears the textarea after successful submission', () => {
    const { getByPlaceholderText, getByRole } = render(
      <NewPost onNewPost={mockOnNewPost} />
    );

    const textarea = getByPlaceholderText(/brilliance/i);
    fireEvent.change(textarea, { target: { value: 'Test post' } });
    fireEvent.click(getByRole('button', { name: /post/i }));

    expect(textarea.value).toBe('');
  });

});
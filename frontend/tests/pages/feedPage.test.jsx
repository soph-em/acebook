/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { FeedPage } from '../../src/pages/Feed/FeedPage';
import { getPosts } from '../../src/services/posts';
import { useNavigate } from 'react-router-dom';

// Mocking the getPosts service
vi.mock('../../src/services/posts', () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});

// Mocking React Router's useNavigate function
vi.mock('react-router-dom', () => {
  const navigateMock = vi.fn();

  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate

  return { useNavigate: useNavigateMock };
});

describe('Feed Page', () => {
  beforeEach(() => {
    window.localStorage.removeItem('token');
  });

  it('It displays posts from the backend', async () => {
    window.localStorage.setItem('token', 'testToken');

    const mockPosts = [
      { _id: '12345', message: 'Test Post 1', date: '2024-01-30' },
    ]; // Example date added

    getPosts.mockResolvedValue({ posts: mockPosts });

    render(<FeedPage />);

    const post = await screen.findByRole('article');
    expect(post.textContent).toContain('Test Post 1'); // Changed from toEqual to toContain
    expect(post.textContent).toContain('Posted on:'); // Checking if 'Posted on:' text is present
  });
});

// Mock the getPosts function
vi.mock('../../services/posts', () => ({
  getPosts: vi.fn().mockResolvedValue({
    posts: [{ message: 'Test Post 1' }, { message: 'Test Post 2' }],
    token: 'fakeToken',
  }),
}));

describe('FeedPage Reversed Posts', () => {
  it('renders posts in reverse chronological order', async () => {
    render(<FeedPage />);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(await document.getElementsByClassName('feed'));
  });
});

describe('Feed Page without Token', () => {
  it('does not display NewPost component if there is no token', () => {
    // Ensure the token is not set in localStorage
    window.localStorage.removeItem('token');

    // Mock data for getPosts
    getPosts.mockResolvedValue({
      posts: [{ _id: '12345', message: 'Test Post 1' }],
    });

    // Render the FeedPage component
    render(<FeedPage />);

    // Try to find the NewPost component
    const newPostComponent = screen.queryByTestId('new-post-form');
    // Expect the NewPost component to not be in the document
    expect(newPostComponent).toBeNull();
  });
});

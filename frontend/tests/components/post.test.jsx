import { render, screen } from '@testing-library/react';

import Post from '../../src/components/Post/Post';

describe('Post component', () => {
  it('displays the message as an article', () => {
    // Mock post data with a createdAt property
    const mockPost = {
      message: 'test message',
      createdBy: 'test user',
      createdAt: new Date().toISOString(), // Use a valid date string
    };

    // Render the Post component with the mock post data
    render(<Post post={mockPost} />);

    const article = screen.getByRole('article');
    expect(article.textContent).toContain('test message');
    // Add any other assertions as needed
  });
});

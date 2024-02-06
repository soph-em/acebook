import { render, screen } from '@testing-library/react';
import LikeButton from '../../src/components/Likes/LikeButton';
import { describe, it, expect } from 'vitest';

describe('Like Button', () => {
  it('Renders the like button on Page', () => {
    render(<LikeButton />);
    const buttonEl = screen.getByText('Like')
    expect(buttonEl).toBeTruthy();
  });
});


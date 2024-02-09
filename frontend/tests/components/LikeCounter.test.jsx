import { render, screen } from '@testing-library/react';
import LikeCounter from '../../src/components/Likes/LikeCounter';
import { describe, it, expect } from 'vitest';

describe('LikeCounter', () => {
  it('Displays the correct number of Likes on Post', () => {
    const mockLikes = [1, 2, 3, 4]; //MOCK DATA
    render(<LikeCounter likes={mockLikes} />)
    const likeCounter = screen.getByText(`Liked by ${mockLikes.length} people`); //Appears On Screen
    expect(likeCounter).toBeTruthy();
  });
});

describe('LikeCounter', () => {
    it('Renders the Like Counter Component', () => {
      const result = render(<LikeCounter likes={[]}/>)
      expect(result).toBeDefined();
    });
  });

  



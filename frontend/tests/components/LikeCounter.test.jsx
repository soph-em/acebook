import { render } from '@testing-library/react';
import LikeCounter from '../../src/components/Likes/LikeCounter';
import { describe, it, expect } from 'vitest';

describe('LikeCounter', () => {
  it('Displays the correct number of Likes on Post', () => {
    const likes = [1, 2, 3];
    const result = render(<LikeCounter likes={likes} />);
    const likesEl = result.getByText(likes.length.toString());
    expect(likesEl).toBeTruthy();
  });
});

describe('LikeCounter', () => {
    it('Renders the Like Counter Component', () => {
      const result = render(<LikeCounter likes={[]}/>)
      expect(result).toBeDefined();
    });
  });

  



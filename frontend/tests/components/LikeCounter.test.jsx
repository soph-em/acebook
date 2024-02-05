import { render } from '@testing-library/react';
import LikeCounter from '../../src/components/Likes/LikeCounter';
import { describe, it, expect } from 'vitest';

describe('LikeCounter', () => {
  it('displays the correct number of likes on page', () => {
    const likes = [1, 2, 3];
    const result = render(<LikeCounter likes={likes} />);
    const likesEl = result.getByText(likes.length.toString());
    expect(likesEl).toBeTruthy();
  });
});

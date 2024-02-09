import { render, screen } from '@testing-library/react';
import LikeButton from '../../src/components/Likes/LikeButton';
import { describe, it, expect } from 'vitest';

describe('Like Button', () => {
  it('Renders the like button on Page', () => {
    test('Renders Post without crashing'), () => {
      render(<LikeButton/>);
      const LikeBtn = screen.getByText('Like Post'); //Checks Like Btn is Visible
      expect(LikeBtn).toBeTruthy;
    };
  });
});

/* With Mock Data!
describe('Like Button', () => {
  it('Renders the like button on Page', () => {
    //Setup Mock Data
    const mockPost = {
      id: 1,
      likes: [1, 2]
    };
  
    test('Renders Post without crashing'), () => {
      render(<LikeButton postId={mockPost} postLikes={1}/>); //Render Like Btn, Pass in Mock Data
      const LikeBtn = screen.getByText('Like Post'); //Checks Like Btn is Visible
      expect(LikeBtn).toBeTruthy;
    };
  });
});
*/
    

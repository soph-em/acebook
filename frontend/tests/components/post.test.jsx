import { render, screen } from "@testing-library/react";
import Post from "../../src/components/Post/Post";

  describe("Post component", () => {
    test("Post Component", () => {
      // Updated mock post data to include createdBy with username
      const mockPost = {
        message: "test message",
        image: "test-image.jpg", //Added
        createdAt: new Date().toISOString(), 
        createdBy: {
          username: "testuser", // Add a username to match your updated component expectations
        },
        likes:0, //Added to match DB
      }
    });

    test('Renders Post without crashing'), () => {
      render(<Post post={mockPost} token="test-token" allowComments={true}/>)
    }

    test('Succesfully renders message'), () => {
      const result = render(<Post post={mockPost} token="test-token" allowComments={true}/>)
      const getByText = result.getByText;
      expect(getByText(mockPost.message)).toBeInTheDocument();
    }

  });
  
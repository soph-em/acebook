import { render, screen } from "@testing-library/react";
import Post from "../../src/components/Post/Post";

describe("Post component", () => {
  it("displays the message and username as an article", () => {
    // Updated mock post data to include createdBy with username
    const mockPost = {
      message: "test message",
      createdBy: "test user",
      createdAt: new Date().toISOString(), // Use a valid date string
      createdBy: {
        username: "testuser", // Add a username to match your updated component expectations
      },
    };

    // Render the Post component with the updated mock post data
    render(<Post post={mockPost} />);

    const article = screen.getByRole("article");
    expect(article.textContent).toContain("test message");
    expect(article.textContent).toContain("testuser"); // Check if the username is displayed
  });
});

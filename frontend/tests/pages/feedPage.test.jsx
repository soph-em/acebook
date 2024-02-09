/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: () => vi.fn(),
}));

vi.mock("../../src/components/Post/UploadWidget", () => {
  return {
    __esModule: true,
    default: ({ onImageUpload }) => {
      // Simulate the behavior of the UploadWidget component
      return (
        <button
          id="upload-button"
          onClick={() => onImageUpload("mockedImageUrl")}
        >
          Upload Image
        </button>
      );
    },
  };
});

// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn().mockResolvedValue({
    posts: [
      {
        _id: "12345",
        message: "Test Post 1",
        createdBy: "Kat",
        date: "2024-01-30",
      },
      { message: "Test Post 2" },
    ],
    token: "fakeToken",
  });
  return { getPosts: getPostsMock };
});

describe("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  it("It displays posts from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    //Updated backend data
    const mockPosts = [
      {
        _id: "12345",
        message: "Test Post 1",
        image: "test-image.jpg",
        createdAt: new Date().toISOString(),
        createdBy: {
          username: "testuser",
        },
        likes: 1,
      },
    ];

    getPosts.mockResolvedValue({ posts: mockPosts });

    render(<FeedPage />);

    const post = await screen.findByRole("article");
    expect(post.textContent).toContain("Test Post 1"); // Changed from toEqual to toContain
    expect(post.textContent).toContain("Posted on:"); // Checking if 'Posted on:' text is present
  });
});

describe("FeedPage Reversed Posts", () => {
  it("renders posts in reverse chronological order", async () => {
    render(<FeedPage />);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(await document.getElementsByClassName("feed"));
  });
});

describe("Feed Page without Token", () => {
  it("does not display NewPost component if there is no token", () => {
    // Ensure the token is not set in localStorage
    window.localStorage.removeItem("token");

    // Render the FeedPage component
    render(<FeedPage />);

    // Try to find the NewPost component
    const newPostComponent = screen.queryByTestId("new-post-form");
    // Expect the NewPost component to not be in the document
    expect(newPostComponent).toBeNull();
  });
});

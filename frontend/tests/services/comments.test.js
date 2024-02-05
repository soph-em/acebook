import { describe, it, expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { fetchComments, postComment } from "../../src/services/comments";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Setup to mock the fetch API calls within the tests
createFetchMock(vi).enableMocks();

// Group tests related to fetchComments function
describe("fetchComments", () => {
  // Test to verify successful fetching of comments
  it("fetches comments successfully from the server", async () => {
    const postId = "123"; // Example postId
    const mockComments = [{ _id: "1", message: "Test comment" }]; // Mock data to simulate API response

    // Mock the fetch response to return a successful response with the mock comments
    fetch.mockResponseOnce(JSON.stringify({ comments: mockComments }));

    // Call the actual function with the test postId
    const comments = await fetchComments(postId);

    // Assertions to ensure fetch was called correctly and returns expected mock comments
    expect(fetch).toHaveBeenCalledWith(`${BACKEND_URL}/${postId}/comments`);
    expect(comments).toEqual(mockComments);
  });

  // Test to ensure the function returns an empty array if the fetch fails
  it("returns an empty array if the request fails", async () => {
    const postId = "123"; // Example postId

    // Mock fetch to simulate a network failure
    fetch.mockRejectOnce(new Error("Failed to fetch comments"));

    // Call the function expecting it to handle the error gracefully
    const comments = await fetchComments(postId);

    // Assertions to check fetch was called and the function returns an empty array on failure
    expect(fetch).toHaveBeenCalledWith(`${BACKEND_URL}/${postId}/comments`);
    expect(comments).toEqual([]);
  });

  // Test to handle cases where the response doesn't contain the expected "comments" key
  it("returns an empty array if the response doesn't contain comments", async () => {
    const postId = "123"; // Example postId

    // Mock the fetch response to return a successful response but without "comments" data
    fetch.mockResponseOnce(JSON.stringify({}));

    // Call the function and check it returns an empty array for missing "comments" data
    const comments = await fetchComments(postId);

    // Assertions to confirm function behavior
    expect(fetch).toHaveBeenCalledWith(`${BACKEND_URL}/${postId}/comments`);
    expect(comments).toEqual([]);
  });
});

// Group tests related to postComment function
describe("postComment", () => {
  // Test for successfully posting a comment
  it("posts a comment successfully to the server", async () => {
    const postId = "123"; // Example postId
    const newComment = "This is a new comment"; // New comment to be posted
    const mockToken = "token123"; // Example token for authorization
    const mockResponseComment = { _id: "2", message: newComment }; // Mock response for a successful comment post

    // Mock the fetch response to simulate a successful post operation
    fetch.mockResponseOnce(JSON.stringify({ comment: mockResponseComment }));

    // Call the postComment function with mock data
    const comment = await postComment(postId, newComment, mockToken);

    // Assertions to check if fetch was called with correct parameters and the function returns the expected data
    expect(fetch).toHaveBeenCalledWith(`${BACKEND_URL}/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mockToken}`,
      },
      body: JSON.stringify({ message: newComment }),
    });
    expect(comment).toEqual(mockResponseComment);
  });
});

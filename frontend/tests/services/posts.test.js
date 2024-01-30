import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import { getPosts } from "../../src/services/posts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("posts service", () => {
  describe("getPosts", () => {
    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await getPosts("testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch posts");
      }
    });
  });
});

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../app");
const User = require("../../models/user");
const Post = require("../../models/post");
const Comment = require("../../models/comment");

require("../mongodb_helper");

const createToken = (userId) => {
  return jwt.sign(
    {
      user_id: userId,
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    process.env.JWT_SECRET
  );
};

describe("Comment Functionality", () => {
  let user, post, token;

  beforeEach(async () => {
    // Clear the database
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    // Create a user and post
    user = await User.create({
      username: "testuser",
      email: "testuser@example.com",
      password: "securepassword",
    });

    post = await Post.create({
      message: "Test post for comments",
      createdBy: user._id,
    });

    token = createToken(user._id);
  });
  // Clear the database after each test
  afterEach(async () => {
    await Comment.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});
  });

  describe("POST /:postId/comments, when a valid token is present", () => {
    test("responds with a 201 and creates a new comment", async () => {
      const response = await request(app)
        .post(`/${post._id}/comments`)
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World, commenting!" });

      expect(response.status).toEqual(201);

      // Verify the comment was created
      const comments = await Comment.find({ post: post._id });
      expect(comments.length).toEqual(1);
      expect(comments[0].message).toEqual("Hello World, commenting!");
    });
  });

  // Add more tests here as needed
  describe("POST /:postId/comments, when a valid token is not present", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post(`/${post._id}/comments`)
        .send({ message: "Hello World, commenting!" });

      expect(response.status).toEqual(401);
    });
  });

  describe("GET /:postId/comments, when a valid token is present", () => {
    test("responds with a 200 and returns comments", async () => {
      await Comment.create({
        message: "Hello World, commenting!",
        createdBy: user._id,
        post: post._id,
      });

      const response = await request(app)
        .get(`/${post._id}/comments`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body.comments.length).toEqual(1);
      expect(response.body.comments[0].message).toEqual(
        "Hello World, commenting!"
      );
    });

    test("responds with a 200 and returns empty array if no comments", async () => {
      const response = await request(app)
        .get(`/${post._id}/comments`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body.comments.length).toEqual(0);
    });

    test("responds with a 404 if post not found", async () => {
      const response = await request(app)
        .get(`/123456789/comments`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(404);
    });
  });
});

const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require("../../models/comment");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
  return JWT.sign(
    {
      user_id: userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
  );
};

let token;
describe("/", () => {
  beforeEach(async () => {
    const user = new User({
      username: "Post",
      email: "post-test@test.com",
      password: "12345678",
    });
    await user.save();
    await Post.deleteMany({});
    token = createToken(user.id);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });
});

describe("/", () => {
  test("");
});

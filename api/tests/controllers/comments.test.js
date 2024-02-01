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

// write a basic unit test for the comment backend
describe("Comments", () => {
  let userOneId, userTwoId, userOne, userTwo, postOne, postTwo, commentOne;

  beforeEach(async () => {
      const user = new User({
        username: 'Post',
        email: 'post-test@test.com',
        password: '12345678',
      });
      await user.save();
      await Post.deleteMany({});
      token = createToken(user.id);

      const userTwo = new User({
        username: "janedoe",
        email: "jane@email.com",
        password: "password123",
      })
      await userTwo.save();
      await Post.deleteMany({
      token = createToken(user.id);
    });
  
    afterEach(async () => {
      await User.deleteMany({});
      await Post.deleteMany({});
    });

    

    userOneId = await User.create(userOne).then((doc) => doc._id);
    userTwoId = await User.create(userTwo).then((doc) => doc._id);

    expect(userOneId).toBeDefined(); //make sure the users are being created
    expect(userTwoId).toBeDefined(); //  before proceeding

    postOne = {
      message: "This is the first post",
      userId: userOneId,
    };

    postTwo = {
      message: "This is the second post",
      userId: userTwoId,
    };

    commentOne = {
      message: "This is the first comment",
      userId: userOneId,
    };

    commentOne.postId = (await Post.create(postOne))._id;

    await Post.create(postTwo);
    await Comment.create(commentOne);
  });

  test("can be created correctly", async () => {
    const comment = {
      message: "Test comment",
      userId: userOneId,
      postId: postOne._id,
    };

    const response = await request(app)
      .post(`/${comment.postId}/comments`)
      .set("Authorization", `Bearer ${createToken(userOneId)}`)
      .send(comment);

    expect(response.status).toEqual(201);
    // expect(response.body.message).toBe(comment.message);
    // expect(response.body.userId).toBe(comment.userId.toHexString());
    // expect(response.body.postId).toBe(comment.postId.toHexString());
  });
});

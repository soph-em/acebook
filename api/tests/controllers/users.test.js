const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app).post("/users").send({
        username: "Poppy",
        email: "poppy@email.com",
        password: "12345678",
      });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app).post("/users").send({
        username: "Scar",
        email: "scarconstt@email.com",
        password: "12345678",
      });

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarconstt@email.com");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ password: "12345678" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "12345678" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  // test getFollowers

  describe("GET /users/:userId/followers", () => {
    test("returns 200 and an array of followers", async () => {
      const hashedPassword = await bcrypt.hash("12345678", 10);
      const user = new User({
        username: "Poppy",
        email: "poppy@email.com",
        password: hashedPassword,
      });

      await user.save();

      // Log in the user and get the token
      const loginResponse = await request(app)
        .post("/tokens")
        .send({ email: user.email, password: "12345678" });

      // Check if the token is received
      console.log(loginResponse.body.token);
      const token = loginResponse.body.token;

      // Include the token in the headers of your request
      const response = await request(app)
        .get(`/users/${user._id}/followers`)
        .set("Authorization", `Bearer ${token}`);

      // Log the response to see what's returned
      console.log(response.body);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  // test getFollowing

  const bcrypt = require("bcryptjs");

  describe("GET /users/:userId/following", () => {
    test("returns 200 and an array of following", async () => {
      const hashedPassword = await bcrypt.hash("12345678", 10);
      const user = new User({
        username: "Poppy",
        email: "poppy@email.com",
        password: hashedPassword,
      });

      await user.save();

      // Log in the user and get the token
      const loginResponse = await request(app)
        .post("/tokens")
        .send({ email: user.email, password: "12345678" });

      // Check if the token is received
      console.log(loginResponse.body.token);
      const token = loginResponse.body.token;

      // Include the token in the headers of your request
      const response = await request(app)
        .get(`/users/${user._id}/following`)
        .set("Authorization", `Bearer ${token}`);

      // Log the response to see what's returned
      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("followUser", () => {
    test("returns 200 and an array of following", async () => {
      const hashedPassword1 = await bcrypt.hash("12345678", 10);
      const user1 = new User({
        username: "Poppy",
        email: "poppy@email.com",
        password: hashedPassword1,
      });

      const hashedPassword2 = await bcrypt.hash("12345678", 10);
      const user2 = new User({
        username: "Scar",
        email: "scar@email.com",
        password: hashedPassword2,
      });

      await user1.save();
      await user2.save();

      // Log in user1 and get the token
      const loginResponse = await request(app)
        .post("/tokens")
        .send({ email: "poppy@email.com", password: "12345678" });

      const token = loginResponse.body.token;

      // User1 follows User2
      const response = await request(app)
        .put(`/users/follow/${user2._id}`)
        .set("Authorization", `Bearer ${token}`);

      // Check the response status and body
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Successfully followed user");

      // Retrieve the list of users that user1 is following
      const followingResponse = await request(app)
        .get(`/users/${user1._id}/following`)
        .set("Authorization", `Bearer ${token}`);

      // Check the response status and body
      expect(followingResponse.statusCode).toBe(200);
      expect(Array.isArray(followingResponse.body)).toBe(true);

      // Check that user2 is in the list of users that user1 is following
      const followingUserIds = followingResponse.body.map((user) =>
        user._id.toString()
      );
      expect(followingUserIds).toContain(user2._id.toString());
    });
  });

  describe("unfollowUser", () => {
    test("returns 200 and an array of following", async () => {
      const hashedPassword1 = await bcrypt.hash("12345678", 10);
      const user1 = new User({
        username: "Poppy",
        email: "poppy@email.com",
        password: hashedPassword1,
      });

      const hashedPassword2 = await bcrypt.hash("12345678", 10);
      const user2 = new User({
        username: "Scar",
        email: "scar@email.com",
        password: hashedPassword2,
      });

      await user1.save();
      await user2.save();

      // Log in user1 and get the token
      const loginResponse = await request(app)
        .post("/tokens")
        .send({ email: "poppy@email.com", password: "12345678" });

      const token = loginResponse.body.token;

      // User1 follows User2
      let response = await request(app)
        .put(`/users/follow/${user2._id}`)
        .set("Authorization", `Bearer ${token}`);

      // User1 unfollows User2
      response = await request(app)
        .put(`/users/unfollow/${user2._id}`)
        .set("Authorization", `Bearer ${token}`);

      // Check the response status and body
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Successfully unfollowed user");

      // Retrieve the list of users that user1 is following
      const followingResponse = await request(app)
        .get(`/users/${user1._id}/following`)
        .set("Authorization", `Bearer ${token}`);

      // Check the response status and body
      expect(followingResponse.statusCode).toBe(200);
      expect(Array.isArray(followingResponse.body)).toBe(true);

      // Check that user2 is not in the list of users that user1 is following
      const followingUserIds = followingResponse.body.map((user) =>
        user._id.toString()
      );
      expect(followingUserIds).not.toContain(user2._id.toString());
    });
  });
});

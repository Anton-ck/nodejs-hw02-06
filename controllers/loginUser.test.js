const express = require("express");
const request = require("supertest");
require("dotenv").config();

const { isEmptyBody } = require("../middlewares");

const controllers = require("./auth");

const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

const app = express();

app.post("/users/login", controllers.loginUser);

describe("test loginUser controller", () => {
  beforeAll(() =>
    mongoose
      .connect(DB_HOST)
      .then(() =>
        app.listen(3000, () => {
          console.log("Database connection successful");
        })
      )
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      })
  );
  afterAll(() => {
    mongoose.disconnect();
  });



  test("loginUser return status code 200", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: "anton@mlan.ck.ua",
        password: 123456,
      })
      .expect(200);
    console.log(response.status);
  });
});

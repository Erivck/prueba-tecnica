import app from "../src/app";
import prisma from "../src/services/prisma";
import request from "supertest";
import { LoginDto, SignupDto } from "../src/validation";

describe("App e2e", () => {
  let accessToken: string;

  beforeAll(async () => {
    await prisma.cleanDB();
  });

  describe("Auth", () => {
    const signupDto: SignupDto = {
      username: "test",
      email: "test@gmail.com",
      password: "1234abcD+",
    }
    const loginDto: LoginDto = {
      username: signupDto.username,
      password: signupDto.password,
    }

    describe("POST /signup", () => {
      it("should throw if email is empty", () => {
        return request(app).post("/signup").send({
          password: signupDto.password,
          username: signupDto.username
        }).expect(400);
      });

      it("should throw if email is invalid", () => {
        return request(app).post("/signup").send({
          ...signupDto,
          email: "invalid-email"
        }).expect(400);
      });
      
      it("should throw if password is not strong enough", () => {
        return request(app).post("/signup").send({
          ...signupDto,
          password: "1234"
        }).expect(400);
      });
      
      it("should throw if username is not valid", () => {
        return request(app).post("/signup").send({
          ...signupDto,
          username: "1234"
        }).expect(400);
      });

      it("should sign up", async () => {
        const res = await request(app).post("/signup").send(signupDto).expect(201);
        accessToken = res.body["access_token"];
      });

      it("should throw if credentials are already taken", () => {
        return request(app).post("/signup").send(signupDto).expect(403);
      });
    });

    describe("POST /login", () => {
      it("should throw if password is empty", () => {
        return request(app).post("/login").send({
          username: loginDto.username
        }).expect(400);
      });

      it("should throw if no body provided", () => {
        return request(app).post("/login").expect(400);
      });
      
      it("should throw if credentials are incorrect", () => {
        return request(app).post("/login").send({
          username: "incorrect",
          password: "123"
        }).expect(401);
      });

      it("should log in", () => {
        return request(app).post("/login").send(loginDto).expect(200);
      });
    });
  });


  describe("User", () => {
    describe("GET /user", () => {
      it("should if user is not authorized", () => {
        return request(app).get("/user").expect(401);
      });

      it("should get current user", () => {
        return request(app).get("/user").set("Authorization", `Bearer ${accessToken}`).expect(200);
      });

    });

    describe("PATCH /user", () => {
      it("should throw if user is not authorized", () => {
        return request(app).patch("/user").send({
          firstName: "test"
        }).expect(401);
      });

      it("should throw if invalid body parameter", () => {
        return request(app).patch("/user").set("Authorization", `Bearer ${accessToken}`).send({
          email: "invalid-email"
        }).expect(400);
      });

      it("should throw if no body parameters", () => {
        return request(app).patch("/user").set("Authorization", `Bearer ${accessToken}`).expect(400);
      });

      it("should update user", () => {
        return request(app).patch("/user").set("Authorization", `Bearer ${accessToken}`).send({
          firstName: "firstName",
          lastName: "lastName"
        }).expect(200);
      });
    });

    describe("DELETE /user", () => {
      it("should throw if user is not authorized", () => {
        return request(app).delete("/user").expect(401);
      });

      it("should delete user", () => {
        return request(app).delete("/user").set("Authorization", `Bearer ${accessToken}`).expect(200);
      });

      it("should throw if has been already deleted", () => {
        return request(app).delete("/user").set("Authorization", `Bearer ${accessToken}`).expect(401);
      });
    });
  });
}); 
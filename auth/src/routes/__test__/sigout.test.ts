import request from "supertest";

import { response } from "express";
import { app } from "../../app";

it("clears the cookie after successful signout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const { body, header } = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);
  console.log(header["Set-Cookie"]);
  expect(header["Set-Cookie"]).toBeUndefined();
});

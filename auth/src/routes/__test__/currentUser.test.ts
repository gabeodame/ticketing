import request from "supertest";
import { app } from "../../../../tickets/src/app";

it("responds with details about the current user", async () => {
  const cookie = await global.signin(); //in test/setup.ts this could alternatively be extracted into helper function and imported in to modules for use.
  console.log(cookie);

  const { body, header } = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const { body } = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(body.currentUser).toEqual(null);
});

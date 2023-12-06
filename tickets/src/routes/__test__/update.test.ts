import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns 404 if id does not exit", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "concert",
      price: 20,
    })
    .expect(404);
});

it("returns 401 if user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "concert",
      price: 20,
    })
    .expect(401);
});
it("returns 401 if user does not own a ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "concert",
      price: 20,
    });

  const foundTicketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin()) // different user
    .send({
      title: "dfdfdf",
      price: 120,
    })
    .expect(401);

  expect(foundTicketResponse.body.title).toEqual("concert");
  expect(foundTicketResponse.body.price).toEqual(20);
});
it("returns 400 if title or price is invalid", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "concert",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "concert",
      price: -20,
    })
    .expect(400);
});

it("updates the ticke if authenticated and valid input", async () => {
  const cookie = global.signin(); // same user
  // create a ticket
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "concert",
      price: 20,
    });

  // update the ticket
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new concert",
      price: 120,
    })
    .expect(200);

  // check if the ticket is updated
  const foundTicketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`) // same ticket
    .send()
    .expect(200);
  expect(foundTicketResponse.body.title).toEqual("new concert");
  expect(foundTicketResponse.body.price).toEqual(120);
});

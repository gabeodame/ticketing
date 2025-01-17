import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";

it("it returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  console.log("id", id);
  const tickets = await mongoose.connection.db.collection("tickets");
  console.log("tickets", tickets.findOne({ id }));
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("it returns the ticket if the ticket is found", async () => {
  const title = "concert";
  const price = 20;
  // create a ticket
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    });
  expect(201);

  // get the ticket
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);
  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});

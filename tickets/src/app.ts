import { NotFoundError, currentUser, errorHandler } from "@gogittix/common";
import { json } from "body-parser";
import express from "express";
import "express-async-errors"; // for catching errors in async routes

import { createTicketRouter } from "./routes/new";
import { indexTicketRouter } from "./routes/index";
import { showTicketRouter } from "./routes/show";
import { updateTicketRouter } from "./routes/update";

import cookieSession from "cookie-session";

//configures app
const app = express();
app.set("trust proxy", true); //this is to make sure express trusts ngnix proxy
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(indexTicketRouter);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(updateTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };

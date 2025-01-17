import express from "express";
import "express-async-errors"; // for catching errors in async routes
import { json } from "body-parser";
import { errorHandler, NotFoundError } from "@gogittix/common";

import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };

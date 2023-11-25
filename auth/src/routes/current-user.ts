import express, { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req: Request, res: Response) => {
  //check if token is set on session cookie. If not return null
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }
  try {
    //verify that token is valid. if invalid, "verify" throws an error
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    //if valid, return payload as currentUser
    res.send({ currentUser: payload });
  } catch (error) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };

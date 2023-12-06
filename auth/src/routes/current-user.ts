import express, { Request, Response } from "express";
import { currentUser } from "@gogittix/common";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,

  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null }); //sets current user to null if undefined for consistency
  }
);

export { router as currentUserRouter };

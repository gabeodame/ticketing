import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  //dump out token inside of browser cookie using cookie-session
  req.session = null;
  res.send({ currentUser: null });
});

export { router as signoutRouter };

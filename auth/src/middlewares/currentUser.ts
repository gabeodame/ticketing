import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//this extends the type definition of request to add in currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

type UserPayload = {
  id: string;
  email: string;
};

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next(); // if no token move on
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    //setting the value of the extended request properpty of currentUser
    req.currentUser = payload;
  } catch (error) {
    // Handle error here
  }
  next();
};

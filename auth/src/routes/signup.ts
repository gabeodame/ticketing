import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidatonError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    // if errors is not empty, return 400 and send errors back to client
    if (!errors.isEmpty()) {
      throw new RequestValidatonError(errors.array());
    }

    console.log("Creating a user...");

    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { router as signupRouter };
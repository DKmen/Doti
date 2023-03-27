import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import UserType from "../types/user";
import { StatusCodes } from "http-status-codes";
import { VerifyErrors } from "jsonwebtoken";

const prisma = new PrismaClient();

interface UserController {
  login(req: Request, res: Response, next: NextFunction): void;
  singUp(req: Request, res: Response, next: NextFunction): void;
  me(req: Request, res: Response, next: NextFunction): void;
}

const controller: UserController = {
  login: async (
    req: Request<{}, {}, UserType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, password } = req.body;
      const salt: string = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });

      return res
        .status(StatusCodes.CREATED)
        .send("user is created successfully");
    } catch (error) {
      next(error);
    }
  },
  singUp: function (req: Request, res: Response, next: NextFunction): void {
    throw new Error("Function not implemented.");
  },
  me: function (req: Request, res: Response, next: NextFunction): void {
    throw new Error("Function not implemented.");
  },
};

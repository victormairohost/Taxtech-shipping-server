import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  // @ts-ignore
  req: Request,
  res: Response,
  // @ts-ignore
  next: NextFunction
) => {
  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Sorry something went wrong, please try again",
    status: "Error",
  };

  res
    .status(error.statusCode)
    .json({ error: error.status, message: error.message });
};

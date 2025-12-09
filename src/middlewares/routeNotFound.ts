import HTTPSTATUSCODE from "../utils/statusCodes.js";
import { Request, Response } from "express";

export const routeNotFound = (req: Request, res: Response) =>
  res
    .status(HTTPSTATUSCODE.NOT_FOUND)
    .json({ message: `Route does'nt exist check the ${req.url} properly` });

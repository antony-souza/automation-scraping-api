import { environment } from "@src/enviroment";
import { NextFunction, Request, Response } from "express";

export const needKeyApiHeadersMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['api-key'] && req.headers['api-key'] === environment.apiKey) {
    next();
    return;
  }

  res.status(401).send({ message: "Not Authenticated" });
}
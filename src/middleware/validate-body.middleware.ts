import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validationBodyMiddleware = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(err => `${err.message} ${err.path}`);

        res.status(400).send({
          message: "Erro de validação",
          errors: errorMessages,
        });
        return;
      }

      res.status(400).send(error);
      return;
    }
  };
};

import { NextFunction, Request, Response } from "express";

const globalErrorHanmdler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    messahe: err.message || "Internal Server is running",
    stack: err.stack,
    err: err,
  });
};

export default globalErrorHanmdler;

import { ErrorRequestHandler,Response, Request, NextFunction  } from "express";
import {HttpError} from '../customErrors/httpError'

export const errorHandler : ErrorRequestHandler = (err: HttpError, req:Request, res: Response, next: NextFunction) =>{

    res.status(err.httpStatus).json({message: err.message});

}
import { Response, Request, NextFunction } from "express";
import { HttpError} from '../customErrors/httpError'

export const notFoundControler = (req: Request, res: Response, next: NextFunction) =>{
    next( new HttpError(404, "not found"));
}
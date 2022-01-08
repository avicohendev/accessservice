
import { sign} from 'jsonwebtoken';
import {apiMap, apiStatus} from '../models/apiMap';
import { Response, Request, NextFunction } from "express";
import {HttpError} from '../customErrors/httpError';

const generateToken = (user : {userId : string, authorizations: string[]}) =>{

    const secretKey :string   =  process.env.SECRET_TOKEN! ;
    const token = sign(user,secretKey, {expiresIn: "1h"});

    return token;
}
/**
 * creates jwt based on api key
 * returns errors if api key is revoked or not exists
 * @param req 
 * @param res 
 * @param next 
 */
export const authenticate = (req : Request, res : Response , next:NextFunction ) =>{

    try{
        //const request = req as userRequest
        if (!req.body.apiKey){
            throw new Error('request body missing apiKey');
        }
        //first check if  such api key exists 
        const api = apiMap.get(req.body.apiKey);

        if(!api){
            throw new Error('api key does not exists');
        }
        //check that api key is not revoked 
        if(api.status === apiStatus.revoked){
            throw new Error('api key is revoked');
        }

        //generate jwt
        const userData = {
            userId : api.user,
            authorizations: api.auth
        }

        const token = generateToken(userData);

        //update api key last used
        apiMap.set(req.body.apiKey, {...api, lastUsage: Date.now()});
    
        
        res.status(200).json({token})
    }
    catch( error: any){
        
        next(new HttpError(400, error.message));
    }
       
    }
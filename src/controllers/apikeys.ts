import {createRandomApiKey} from '../utils/randomKey'
import {apiMap, userAndAuth , apiStatus, userApis} from '../models/apiMap';
import { Response, Request, NextFunction } from "express";
import {HttpError} from '../customErrors/httpError';

const generateAndStoreApiKey = (uid: string, authArray: string[])=>{
    const apiKey = createRandomApiKey(uid);
    
    const userData :userAndAuth ={
        user: uid,
        auth: authArray,
        lastUsage: null,
        status: apiStatus.active
    }
    //add to apiKeys datastructure
    apiMap.set(apiKey, userData);
    
    return apiKey;

}



/**
 * creates new api key
 * @param req o
 * @param res 
 * @param next 
 */
export const apiKeyCreateController = (req : Request, res : Response , next:NextFunction ) =>{

try{
    //const request = req as userRequest
    if (!req.body.userId){
        throw new Error('request body missing userId');
    }
    if( !req.body.authorizations){
        throw new Error('request body missing authorizations array');
    }

    const apiKey = generateAndStoreApiKey(req.body.userId as string, req.body.authorizations);

    const userApiArray = userApis.has(req.body.userId)? userApis.get(req.body.userId) : [];
    userApiArray!.push(apiKey);
    userApis.set(req.body.userId, userApiArray!)
    res.status(200).json({apiKey});
}
catch( error: any){
    next(new  HttpError(400, error.message))
}
   
}

type revokeParams={
    id: string

}
/**
 * revokes api key
 * @param req 
 * @param res 
 * @param next 
 */
export const apiKeyRevokeController = (req : Request<revokeParams>, res : Response , next:NextFunction ) =>{

    try{
        const apiKey = req.params.id
        //first check if  such api key exists 
        const api = apiMap.get(apiKey);

        if(!api){
            throw new Error('api key does not exists');
        }
        apiMap.set(apiKey, {...api, status: apiStatus.revoked});
        res.status(200).json({message : `api key was revoked`});
    }

    catch( error: any){
        next(new  HttpError(400, error.message))
    }
}

export const getUserApiController= (req: Request, res: Response, next: NextFunction) =>{

    try{
        //check if user has api
        if(!req.body.userId){
            throw new Error('request body missing userId');
        }
        const apis : {apiKey: string, status: string}[] =[];
        const apiKeys = userApis.get(req.body.userId);
        if(apiKeys){
            for (const api of apiKeys){
                const maskedArray = new Array(api.length -4);
                maskedArray.fill('*');
                maskedArray.push(...api.slice(api.length -4));
                const maskedString = maskedArray.join('');

                const apiData :userAndAuth = apiMap.get(api)!;
                const apiAndStatus = {
                    apiKey : maskedString,
                    status: apiData.status.toString()
            }
            apis.push(apiAndStatus)
        }
    }
        res.status(200).json(apis)
    }
    catch (error: any){
        next(new  HttpError(400, error.message))
    }
}




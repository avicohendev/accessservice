import {createHash} from 'crypto'


/**
 * generate unique api key based on user id and current timestamp
 * @param uid unique user id 
 * @returns random  string api key 
 */
const createRandomApiKey = (uid : string) =>{

    const current_date = (new Date()).valueOf().toString();
    return createHash('sha1').update(current_date  + uid).digest('hex');
}

export {createRandomApiKey}
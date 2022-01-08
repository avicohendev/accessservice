export class HttpError  extends Error {
    httpStatus: number;
    constructor(httpStatus: number, message: string){
        super(message)
        this.httpStatus =  httpStatus;
    }
}
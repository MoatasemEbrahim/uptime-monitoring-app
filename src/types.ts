import {IncomingHttpHeaders} from 'http'

export type reqInfo = {
    trimmedPath: string | undefined;
    queryStringObj: Record<string, any>;
    method: string;
    headers: IncomingHttpHeaders;
    payload: Record<string, any>;
}

export type resCallback = (statusCode:number,payload?:Object)=>void

export type handlerCallback = (reqInfo:reqInfo,callback:resCallback)=>void

export type middlewareType = (reqInfo:reqInfo,callback:resCallback,nextHandler?:handlerCallback | middlewareType)=>void

import {IncomingHttpHeaders} from 'http'

export type reqInfo = {
    trimmedPath: string | undefined;
    queryStringObj: Record<string, any>;
    method: string;
    headers: IncomingHttpHeaders;
    payload: Record<string, any>;
}

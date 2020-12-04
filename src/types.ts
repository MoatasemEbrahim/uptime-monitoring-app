import {IncomingHttpHeaders} from 'http'
import {ParsedUrlQuery} from 'querystring';

export type reqInfo = {
    trimmedPath: string | undefined;
    queryStringObj: ParsedUrlQuery;
    method: string;
    headers: IncomingHttpHeaders;
    payload: string;
}

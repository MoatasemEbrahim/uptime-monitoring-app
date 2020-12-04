import url from 'url';
import {IncomingMessage} from 'http';

const requestHelper = (req:IncomingMessage) =>{

    const parsedURL = url.parse(req?.url || '',true);

    const path = parsedURL.pathname;

    const trimmedPath = path?.replace(/^\/+|\/+$/g,'');

    const queryStringObj = parsedURL.query;

    const method :string = req?.method?.toUpperCase() || '';

    const headers = req.headers;

    return {
        parsedURL,path,trimmedPath,queryStringObj,method,headers
    }
}

export default requestHelper;
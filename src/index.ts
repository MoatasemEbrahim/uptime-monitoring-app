import http,{IncomingMessage,ServerResponse} from 'http';
import https from 'https';
import fs from 'fs';
import { StringDecoder } from 'string_decoder'
import requestHelper from './helpers/request';
import config from './config';
import path from 'path';
import handlers from './handlers/handlers';
import {reqInfo} from './types';
import {parseStringToObject} from './helpers/string'

const unifiedServer = (req:IncomingMessage,res:ServerResponse) => {
    const {trimmedPath,queryStringObj,method,headers} = requestHelper(req)

    const decoder = new StringDecoder('utf-8');

    let buffer = '';

    req.on('data',(data:any)=>{
        buffer += decoder.write(data);
    })

    req.on('end',()=>{
        buffer+= decoder.end();
        
        const chosenHandler :(data:reqInfo,callback:(statusCode:number,payload?:Object) => void) => void = 
        handlers[trimmedPath as handlersTypes] ? handlers[trimmedPath as handlersTypes] : handlers.notFound;
        const reqData = {
            trimmedPath,
            queryStringObj,
            method,
            headers,
            payload:parseStringToObject(buffer)
        }

        chosenHandler(reqData,(statusCode:number,payload?:Object)=>{
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
            payload = typeof(payload) === 'object' ? payload : {}
            const payloadString = JSON.stringify(payload);
            res.setHeader('Content-Type','application/json')
            res.writeHead(statusCode)
            res.end(payloadString)
        })
    
    })
}

type handlersTypes = keyof typeof handlers;

const httpServer = http.createServer((req,res)=>{
    unifiedServer(req,res)
})

httpServer.listen(config.httpPort,()=>{
    console.log(`http server started on port ${config.httpPort}`)
})

const httpsServerOption = {
    key: fs.readFileSync(path.resolve('./https/key.pem')),
    cert: fs.readFileSync(path.resolve('./https/cert.pem')),
}

const httpsServer = https.createServer(httpsServerOption,(req,res)=>{
    unifiedServer(req,res)
})

httpsServer.listen(config.httpsPort,()=>{
    console.log(`https server started on port ${config.httpsPort}`)
})
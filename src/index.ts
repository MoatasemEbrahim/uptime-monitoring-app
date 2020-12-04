import http,{IncomingMessage,ServerResponse} from 'http';
import https from 'https';
import fs from 'fs';
import { StringDecoder } from 'string_decoder'
import requestHelper from './utils/request';
import config from './config';
import path from 'path';
import lib from './lib/storage'

const unifiedServer = (req:IncomingMessage,res:ServerResponse) => {
    const {parsedURL,path,trimmedPath,queryStringObj,method,headers} = requestHelper(req)

    const decoder = new StringDecoder('utf-8');

    let buffer = '';

    req.on('data',(data:any)=>{
        buffer += decoder.write(data);
    })

    req.on('end',()=>{
        buffer+= decoder.end();

        const chosenHandler = handlers[trimmedPath as handlersTypes] ? handlers[trimmedPath as handlersTypes] : handlers.notFound;
        const data = {
            trimmedPath,
            queryStringObj,
            method,
            headers,
            payload:buffer
        }

        chosenHandler(data,(statusCode:number,payload?:Object)=>{
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
            payload = typeof(payload) === 'object' ? payload : {}
            const payloadString = JSON.stringify(payload);
            res.setHeader('Content-Type','application/json')
            res.writeHead(statusCode)
            res.end(payloadString)
        })
    
    })
}

const handlers = {
    sample : (data:any,callBack : (statusCode:number,payload?:Object)=>void)=>{
        callBack(406,{name:'sample handler'})
    },
    notFound : (data:any,callBack: (statusCode:number,payload?:Object)=>void)=>{
        callBack(404)
    },
    ping: (data:any,callBack : (statusCode:number,payload?:Object)=>void)=>{
        callBack(200)
    }
}

type handlersTypes = keyof typeof handlers;

const router = {
    sample: handlers.sample,
    ping: handlers.ping
}

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
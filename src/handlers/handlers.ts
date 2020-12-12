import {reqInfo} from '../types';
import usersHandler from './usersHandler';
import tokensHandler from './tokensHandler';

const routes = {
    "users": usersHandler,
    "tokens": tokensHandler,
    notFound : (data:reqInfo,callBack: (statusCode:number,payload?:Object)=>void)=>{
        callBack(404)
    },
    ping: (data:reqInfo,callBack : (statusCode:number,payload?:Object)=>void)=>{
        callBack(200)
    }
}

export default routes;

import usersHandler from './usersHandler';
import {reqInfo} from '../types';

const routes = {
    "users":usersHandler,
    notFound : (data:reqInfo,callBack: (statusCode:number,payload?:Object)=>void)=>{
        callBack(404)
    },
    ping: (data:reqInfo,callBack : (statusCode:number,payload?:Object)=>void)=>{
        callBack(200)
    }
}

export default routes;

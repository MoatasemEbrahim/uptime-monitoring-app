import tokensControllers from '../controllers/tokens/tokens';
import {reqInfo} from '../types';

const controller = {
    GET : tokensControllers.getToken,
    POST : tokensControllers.addToken,
    PUT : tokensControllers.editToken,
    DELETE : tokensControllers.deleteToken,
}

const tokensHandler = (data:reqInfo,callback:(statusCode:number,payload?:Object)=>void)=>{
    const acceptableMethods = ['GET','POST','PUT','DELETE'];

    const method = data.method
    if(acceptableMethods.includes(method)){
        controller[method as keyof typeof controller](data,callback)
    }else{
        callback(405)
    }
}

export default tokensHandler;

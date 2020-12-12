import usersControllers from '../controllers/users/users';
import {reqInfo} from '../types';
import verifyToken from '../controllers/tokens/verifyToken';

const controller = {
    GET : usersControllers.getUser,
    POST : usersControllers.addUser,
    PUT : usersControllers.editUser,
    DELETE : usersControllers.deleteUser,
}

const usersHandler = (data:reqInfo,callback:(statusCode:number,payload?:Object)=>void)=>{
    const acceptableMethods = ['GET','POST','PUT','DELETE'];

    const method = data.method
    if(acceptableMethods.includes(method)){
        const handler = controller[method as keyof typeof controller]
        if(method === 'POST'){
            handler(data,callback)
        }else{
            verifyToken(data,callback,handler)
        }
    }else{
        callback(405)
    }
}

export default usersHandler;

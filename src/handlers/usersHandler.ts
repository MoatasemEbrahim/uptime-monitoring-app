import usersControllers from '../controllers/users';
import {reqInfo} from '../types';

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
        controller[method as keyof typeof controller](data,callback)
    }else{
        callback(405)
    }
}

export default usersHandler;

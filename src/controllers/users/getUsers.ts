import {reqInfo} from '../../types';
import storage from '../../lib/storage';
import {isValidString} from '../../helpers/string';

const getUser = (data:reqInfo,callback:(statusCode:number,payload?:Object)=>void)=>{
    const {phone} = data.queryStringObj
    if(isValidString(phone) && phone.trim().length === 11){
        storage.read('users',phone.trim(),(err,data)=>{
            if(!err && data){
                delete data.password
                callback(200,data)
            }else{
                callback(404,{Error: "couldn't find the specified user"})
            }
        })
    }else{
        callback(400,{Error:'Missing required field'})
    }
}

export default getUser;

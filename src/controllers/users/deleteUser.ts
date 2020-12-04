import {reqInfo} from '../../types';
import storage from '../../lib/storage';
import {isValidString} from '../../helpers/string';

const deleteUser = (data:reqInfo,callback:(statusCode:number,payload?:Object)=>void)=>{
    const {phone} = data.queryStringObj
    if(isValidString(phone) && phone.trim().length === 11){
        storage.read('users',phone.trim(),(err,data)=>{
            if(!err && data){
                storage.delete('users',phone.trim(),(err)=>{
                    if(!err){
                        callback(200,{res: "User has been deleted successfully"})
                    }else{
                        callback(500,{Error: "Couldn't delete the specified user"})
                    }
                })
            }else{
                callback(404,{Error: "couldn't find the specified user"})
            }
        })
    }else{
        callback(400,{Error:'Missing required field'})
    }
}

export default deleteUser;

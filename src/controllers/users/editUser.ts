import {reqInfo} from '../../types';
import storage from '../../lib/storage';
import {isValidString} from '../../helpers/string';

const editUser = (data:reqInfo,callback:(statusCode:number,payload?:Object)=>void)=>{
    const {firstName,lastName,password,phone} = data.payload
    const optionalFields = {
        firstName: isValidString(firstName),
        lastName: isValidString(lastName),
        password: isValidString(password),
    }
    if(
        isValidString(phone) && phone.trim().length === 11
    ){
        storage.read('users',phone.trim(),(err,userData)=>{
            if(!err && userData){
                const newFields = Object.entries(optionalFields).filter(([key,value])=>value).reduce((newValues,[key,value])=> 
                    ({...newValues,[key]:data.payload[key].trim()}),{})
                const newUserData = {...userData,...newFields}
                storage.update('users',phone.trim(),newUserData,(err)=>{
                    if(!err){
                        callback(200,{res:"User data has been edited successfully"})
                    }else{
                        callback(500,{Error: "Couldn't update the user data"})
                    }
                })
            }else{
                callback(400,{Error:"The specified user doesn't exist"})
            }
        })
    }else{
        callback(400,{Error:'Missing required field'})
    }
}

export default editUser;

import {reqInfo} from '../../types';
import storage from '../../lib/storage';
import {hashPassword} from '../../helpers/password';
import {isValidString} from '../../helpers/string';

const addUser = (data:reqInfo,callback:(statusCode:number,payload?:Object)=>void)=>{
    const {firstName,lastName,phone,password,tosAgreement} = data.payload
    if(
        isValidString(firstName) && isValidString(lastName) && isValidString(password) &&
        isValidString(phone) && phone.trim().length === 11 && tosAgreement
    ){
        storage.read('users',phone.trim(),(err)=>{
            if(err && err.errno){
                const data = {
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    phone: phone.trim(),
                    password: hashPassword(password.trim()),
                }
                storage.create('users',phone.trim(),data,(err)=>{
                    if(!err){
                        callback(200,{res:"User added successfully"})
                    }else{
                        callback(405,err)
                    }
                })
            }else{
                callback(400,{Error:'A user with that phone number already exist'})
            }
        })
    }else{
        callback(400,{Error:'Missing required data'})
    }
}

export default addUser;

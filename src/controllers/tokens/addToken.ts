import storage from '../../lib/storage';
import {hashPassword} from '../../helpers/password';
import {isValidString,createRandomString} from '../../helpers/string';
import {handlerCallback} from '../../types'

const addToken:handlerCallback = (data,callback)=>{
    const {phone,password} = data.payload
    if(isValidString(password) && isValidString(phone) && phone.trim().length === 11){
        storage.read('users',phone.trim(),(err,userData)=>{
            if(!err && userData){
                if(hashPassword(password.trim()) === userData.password){
                    const tokenId = createRandomString()
                    const expires = Date.now() + (1000*60*60);
                    const tokenObj = {
                        id: tokenId,
                        phone,
                        expires,
                    }
                    storage.create('tokens',tokenId,tokenObj,(err)=>{
                        if(!err){
                            callback(200,{res:"Token added successfully"})
                        }else{
                            callback(405,err)
                        }
                    })
                }else{
                    callback(400,{Error: "Password didn't match the specified user"})
                }
            }else{
                callback(400,{Error:"Couldn't find the specified user"})
            }
        })
    }else{
        callback(400,{Error:'Missing required data'})
    }
}

export default addToken;

import storage from '../../lib/storage';
import {isValidString} from '../../helpers/string';
import {handlerCallback} from '../../types'

const editToken:handlerCallback = (data,callback)=>{
    const {id,extend} = data.payload

    if(isValidString(id) && id.trim().length === 20 && extend){
        storage.read('tokens',id.trim(),(err,tokenData)=>{
            if(!err && tokenData){
                if(tokenData.expires > Date.now()){  
                    const newTokenData = {...tokenData, expires: Date.now() + (1000*60*60)}
                    storage.update('tokens',id.trim(),newTokenData,(err)=>{
                        if(!err){
                            
                            callback(200,{res:"Token data has been edited successfully"})
                        }else{
                            callback(500,{Error: "Couldn't update the token data"})
                        }
                    })
                }else{
                    callback(400,{Error: "Token has been already expired"})
                }
            }else{
                callback(400,{Error:"The specified token doesn't exist"})
            }
        })
    }else{
        callback(400,{Error:'Missing required field'})
    }
}

export default editToken;

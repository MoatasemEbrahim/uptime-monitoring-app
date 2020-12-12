import storage from '../../lib/storage';
import {isValidString} from '../../helpers/string';
import {handlerCallback} from '../../types'

const getToken:handlerCallback = (data,callback)=>{
    const {id} = data.queryStringObj
    if(isValidString(id) && id.trim().length === 20){
        storage.read('tokens',id.trim(),(err,tokenData)=>{
            if(!err && tokenData){
                callback(200,tokenData)
            }else{
                callback(404,{Error: "couldn't find the specified token"})
            }
        })
    }else{
        callback(400,{Error:'Missing required field'})
    }
}

export default getToken;

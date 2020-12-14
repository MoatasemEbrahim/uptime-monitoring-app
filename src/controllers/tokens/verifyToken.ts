import storage from '../../lib/storage';
import {isValidString} from '../../helpers/string';
import {middlewareType} from '../../types'


const verifyToken :middlewareType = (data,callback,nextHandler)=>{
    const {token:tokenId} = data.headers
    const userId = data.payload.phone || data.queryStringObj.phone
    console.log(userId)
    if(isValidString(userId) && typeof tokenId === 'string'){
        storage.read('tokens',tokenId.trim(),(err,tokenData)=>{
            if(!err && tokenData){
                if(tokenData.phone === userId?.trim() && tokenData.expires > Date.now() && nextHandler){
                    nextHandler(data,callback)
                }else{
                    callback(400,{Error: "Invalid token"})
                }
            }else{
                callback(404,{Error: "couldn't find the specified token"})
            }
        })
    }else{
        callback(400,{Error:'Missing required field'})
    }
}

export default verifyToken;

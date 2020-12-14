import storage from '../../lib/storage';
import {isValidString} from '../../helpers/string';
import {handlerCallback} from '../../types'

const deleteToken:handlerCallback = (data,callback)=>{
    const {id} = data.queryStringObj
    if(isValidString(id) && id.trim().length === 20){
        storage.read('tokens',id.trim(),(err,data)=>{
            if(!err && data){
                storage.delete('tokens',id.trim(),(err)=>{
                    if(!err){
                        callback(200,{res: "Token has been deleted successfully"})
                    }else{
                        callback(500,{Error: "Couldn't delete the specified token"})
                    }
                })
            }else{
                callback(404,{Error: "couldn't find the specified token"})
            }
        })
    }else{
        callback(400,{Error:'Missing required field'})
    }
}

export default deleteToken;

import crypto from 'crypto';
import config from '../config';

export const hashPassword = (str:string)=>{
    if(str){
        const hashedPassword =crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
        return hashedPassword
    }else{
        return ''
    }
}

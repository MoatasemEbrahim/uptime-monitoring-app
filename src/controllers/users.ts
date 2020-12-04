import {reqInfo} from '../types';

const getUser = (data:reqInfo,callback:(statusCode:number,payload?:Object)=>void)=>{
    callback(200,{res:'done'})
}
const addUser = (data:reqInfo,callback:(statusCode:number,payload?:Object)=>void)=>{
    callback(200,{res:'done'})
}
const editUser = (data:reqInfo,callback:(statusCode:number,payload?:Object)=>void)=>{
    callback(200,{res:'done'})
}
const deleteUser = (data:reqInfo,callback:(statusCode:number,payload?:Object)=>void)=>{
    callback(200,{res:'done'})
}

export default {
    getUser,addUser,editUser,deleteUser
}
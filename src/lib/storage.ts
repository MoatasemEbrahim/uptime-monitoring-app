import fs from 'fs';
import path from 'path';
import {parseStringToObject} from '../helpers/string'

const baseDir = path.join(__dirname,'/../.data')

const create = (dir:string,file:string,data:Record<string, any>,callback:(msg:string|boolean)=>void)=>{
    fs.open(`${baseDir}/${dir}/${file}.json`,'wx',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);

            fs.writeFile(fileDescriptor,stringData,(err)=>{
                if(!err){
                    fs.close(fileDescriptor,(err)=>{
                        if(!err){
                            callback(false)
                        }else {
                            callback("Error closing new file")
                        }
                    })
                }else{
                    callback("Error writing to new file")
                }
            })
        }else{
            callback("Couldn't create new file, it may already exist")
        }
    })
}

const read = (dir:string,file:string,callback:(err:NodeJS.ErrnoException | null,data:Record<string,any>)=>void)=>{
    fs.readFile(`${baseDir}/${dir}/${file}.json`,'utf8',(err,data)=>{
        callback(err,parseStringToObject(data))
    })
}

const update = (dir:string,file:string,data:Record<string, any>,callback:(msg:string|boolean)=>void)=>{
    fs.open(`${baseDir}/${dir}/${file}.json`,'r+',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);

            fs.ftruncate(fileDescriptor,(err)=>{
                if(!err){
                    fs.writeFile(fileDescriptor,stringData,(err)=>{
                        if(!err){
                            fs.close(fileDescriptor,(err)=>{
                                if(!err){
                                    callback(false)
                                }else{
                                    callback('Error closing file')
                                }
                            })
                        }else{
                            callback('Error writing to existing file');
                        }
                    })
                }else{
                    callback("Error truncating file")
                }
            })
        }else{
            callback("Couldn't open the file for update, it may not exist")
        }
    })
}


const remove = (dir:string,file:string,callback:(err:string|boolean)=>void) =>{
    fs.unlink(`${baseDir}/${dir}/${file}.json`,(err)=>{
        if(!err){
            callback(false)
        }else{
            console.warn('Error deleting file')
        }
    })
}


export default {
    create,read,update,delete:remove
}

export const parseStringToObject : (str:string)=> Record<string, any>  = (str)=>{
    try {
        const parsedString =  JSON.parse(str);
        return parsedString;
    } catch (error) {
        return {}
    }
}

export const isValidString : (str:any)=> boolean = (str)=>{
    if(typeof str === 'string' && str.trim()){
        return true;
    }
    return false
} 
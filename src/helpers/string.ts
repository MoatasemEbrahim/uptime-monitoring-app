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

export const createRandomString = ()=>{
    console.log((Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12)).length)
    return  Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
}

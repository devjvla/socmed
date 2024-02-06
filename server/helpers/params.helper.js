checkFields = (required_fields, optional_fields=[], req_body) => {
    let response_data = {status: false, result: {}, error: null};
    
    try{
        if(!Array.isArray(required_fields) || !Array.isArray(optional_fields)){
            throw Error("Arguments have incorrect data types. Must pass array.");
        }

        let all_fields     = required_fields.concat(optional_fields);
        let sanitized_data = {};
        let missing_fields = [];

        for(let index in all_fields){
            let key   = all_fields[index]; 
            let value = req_body[key] != undefined ? req_body[key] : ""; 

            if(String(value).trim() === "" && required_fields.includes(key)){
                missing_fields.push(key);
            }else{
                sanitized_data[key] = value;
            }
        }
        
        response_data.status = missing_fields.length === 0;
        response_data.result = response_data.status ? sanitized_data : {missing_fields}; 
    }
    catch(error){
        response_data.error = error;
    }

    return response_data;
}

module.exports = { checkFields }
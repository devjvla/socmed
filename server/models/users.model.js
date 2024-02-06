const Mysql  = require("mysql2");
const db     = require("../helpers/database.helper");

/* Import constants */
const { constants } = require("../config");
const { 
    TRUE_VALUE,
    FALSE_VALUE
} = constants;

class UserModel {
    getUser = async (params) => {
        let response_data = {status: false, result: {}, error: {}};

        try {
            let { user_id, email, given_name, family_name, picture } = params;

            let where_clause = "email = ?";
            let where_value  = email;

            if(user_id){
                where_clause = "id = ?";
                where_value  = user_id; 
            }

            let get_user_query = Mysql.format(`SELECT id, email, first_name, last_name, picture_url FROM users WHERE ${where_clause};`, [where_value]);
            let [user_data]    = await db.executeQuery(get_user_query);

            if(!user_data){
                /* Check if 'verified_email' exists in params. If it exists, perform Sign In processes */
                if("verified_email" in params) {
                    if(!params.verified_email) {
                        throw new Error("We're unable to proceed with the sign in process because your email is not verified.");
                    }

                    let create_user_query = Mysql.format(`
                        INSERT INTO users (email, first_name, last_name, picture_url, created_at, updated_at) 
                        VALUES (?, ?, ?, ?, NOW(), NOW());`
                    , [email, given_name, family_name, picture]);
                    let create_user = await db.executeQuery(create_user_query);
    
                    if(!create_user){
                        throw new Error("An error occured while trying to create User record.");
                    }
    
                    user_data = { 
                        id: create_user.insertId,
                        email_address: email,
                        first_name: given_name,
                        last_name: family_name,
                        picture_url: picture
                    }
                }
            }
            
            response_data.status = true;
            response_data.result = user_data;
        } catch (error) {
            response_data.error = error;
        }

        return response_data;
    }
}

module.exports = UserModel
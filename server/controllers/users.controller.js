const UserModel = require("../models/users.model");
const { checkFields } = require("../helpers/params.helper");
class UsersController {
    #req;
    #res;
    #next;

    constructor(req = undefined, res = undefined, next = undefined){
        this.#req  = req;
        this.#res  = res;
        this.#next = next;
    }

    signinUser = async () => {
        let response_data = {status: false, result: {}, error: null}

        try {
            let {email, ...user_info} = this.#req.body;

            let check_fields = checkFields(["email"], [], {email});

            if(!check_fields.status) {
                throw new Error(`Missing required fields! ${check_fields.result}`);
            }

            let userModel   = new UserModel();
            let signin_user = await userModel.getUser({email, ...user_info});

            if(!signin_user.status) {
                throw new Error(signin_user.error);
            }

            /* Create user session */
            this.#req.session.user_info = { ...signin_user.result }
            response_data = { ...signin_user };
        } catch (error) {
            response_data.error = error;
        }

        this.#res.json(response_data);
    }

    getUser = async () => {
        let response_data = {status: false, result: {}, error: null}

        try {
            let check_fields = checkFields([], ["user_id", "email"], this.#req.body);

            console.log("CHECK_FIELDS: ", check_fields);
        } catch (error) {
            response_data.error = error;
        }

        this.#res.json(response_data);
    }
}

module.exports = UsersController
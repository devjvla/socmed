import axios from "axios";

export default (function UserServices() {
    async function googleSignIn(access_token) {
        let response_data = {status: false, result: {}, error: null}

        try {
            let get_google_info = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,{
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: "application/json",
                }
            });

            if(get_google_info.status !== 200){
                throw new Error("Failed to fetch user info.");
            }

            let url = `${process.env.REACT_APP_SOCMED_BE_BASE_URL}/users/signin`;
            console.log("URL: ", url);

            await axios.post(url, get_google_info.data)
            .then(response => {
                console.log("SERVICES | googleSignIn");
                console.log(response.data);

                response_data = response.data;
            });

        } catch (error) {
            response_data.error = error;
        }

        return response_data;
    }

    return { googleSignIn }
})();
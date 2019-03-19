import * as axios from 'axios';

export default class AuthService {

    static async attempt({ username, password }) {
        return await axios({
            url: '/your url here',
            method: 'POST',
            data: {
                username,
                password
            }
        });
    }
}
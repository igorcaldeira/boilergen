import { stateRoot } from "../../store/store";

export default class OauthService {

    static verifyAuth() {
        console.log('passou', stateRoot);
    }
}

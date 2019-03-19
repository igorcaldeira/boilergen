import * as Type from "./actionsTypes";

const attempt = ({ username, password }) => ({ type: Type.FETCH_AUTH, username, password});

export {
    attempt
}
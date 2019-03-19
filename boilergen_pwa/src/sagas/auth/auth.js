import * as TypeActions from '../../store/auth/actionsTypes';
import {put, takeLatest} from "redux-saga/effects";
import AuthService from "../../services/AuthService";

function * attempt(action) {
    try {

        const response = yield AuthService.attempt(action)
        yield put({
            type: TypeActions.FETCH_AUTH_SUCCESS,
            data: response.data
        });

    } catch (error) {

        yield put({
            type: TypeActions.FETCH_AUTH_FAILED,
            error
        });
    }
}

export default function * watchAuth() {
    yield takeLatest(TypeActions.FETCH_AUTH, attempt);
}
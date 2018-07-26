import {all} from 'redux-saga/effects';
import watchAuth from './auth/auth';

export default function* rootSaga() {
    yield all([
        watchAuth(),
    ])
}
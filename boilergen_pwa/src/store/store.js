import { applyMiddleware, combineReducers, compose, createStore} from 'redux';
import rootReducer from "./rootReducer";
import DEV_TOOLS from "../config/devTools";
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/rootSaga';
import { from } from 'rxjs/observable/from';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createEncryptor from 'redux-persist-transform-encrypt';
import uiReducer from "./uiReducer";

const encryptor = createEncryptor({
    secretKey: 'b76eebb16ebf6fdc69d55988b5560050',
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = DEV_TOOLS || compose;

const persistRootConfig = {
    key: 'rootState',
    storage,
    transforms: [encryptor]
};

const persistConfigInterface = {
	key: 'ui',
	storage,
	transforms: [encryptor]
};


const persistedRoot = persistReducer(persistRootConfig, rootReducer);
const persistedInterface = persistReducer(persistConfigInterface, uiReducer);

const reducers = combineReducers({
    rootState: persistedRoot,
    ui: persistedInterface,
});


const state = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(state);
const state$ = from(state);
sagaMiddleware.run(rootSaga);

function stateRoot() {
    return state.getState().rootState
}

export {
    state,
    persistor,
    state$,
    stateRoot
};
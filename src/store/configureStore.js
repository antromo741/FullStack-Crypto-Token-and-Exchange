import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from  'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger()
const middleware = []

//For Redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(preloadedState) {
    return createStore(
        preloadedState,
        rootReducer,
        composeEnhancers(applyMiddleware(...middleware, loggerMiddleware))
)}
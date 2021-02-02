import { applyMiddleware, createStore, combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router";
import uiReducer from "./ui/uiReducer";

const setAppStore = (history) => {
  const routerMiddleware = createRouterMiddleware(history)
  const middlewares = [routerMiddleware]

  // All midlewares as enhancer
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // All enhancers
  const enhancers = [middlewareEnhancer];

  // Devtools options
  const devToolsOptions = {
    trace: true,
    traceLimit: 25,
  };

  // Compose with devtools
  const compose = composeWithDevTools(devToolsOptions);
  const composedEnhancers = compose(...enhancers);

  const reducers = combineReducers({
    router: connectRouter(history),
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    uiReducer
  })

  return createStore(reducers, composedEnhancers)
}

export default setAppStore;

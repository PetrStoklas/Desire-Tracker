import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { ConnectedRouter } from "connected-react-router";
// Firebase and Redux
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import firebase from "firebase/app";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
// Locals
import setAppStore from "./redux/store";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from "./theme";

const fbConfig = JSON.parse(process.env.REACT_APP_FB_CONFIG)
const fbReduxConfig = {
  enableLogging: true,
  userProfile: "users",
  useFirestoreForProfile: true,
};

firebase.initializeApp(fbConfig)

// BrowserHistory
export const history = createBrowserHistory();
// Redux
const appStore = setAppStore(history)

ReactDOM.render(
  <Provider store={appStore}>
    <ReactReduxFirebaseProvider
        firebase={firebase}
        config={fbReduxConfig}
        dispatch={appStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}
    >
      <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={4}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </SnackbarProvider>
      </ThemeProvider>
      </ConnectedRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

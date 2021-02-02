import React from 'react';
import { Route, Switch } from "react-router-dom";
import { useFirestoreConnect } from "react-redux-firebase";
// Locals
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import ManageDesiresPage from "./pages/manage-desires";
import CreateCategoryPage from "./pages/create-category";
import VotingPage from "./pages/voting";
// import Register from "./pages/auth/register";
import { login, manage, createCategory, home, voting } from "./routes";
import { useUserId } from "./firebase/hooks";
import {queries} from "./firebase/queries";

function App() {
  const loggedInId = useUserId();

  useFirestoreConnect(
    !!loggedInId
      ? [{
        collection: queries.users,
        doc: loggedInId,
        storeAs: queries.me
      }] : []
  )

  return (
    <div className="App">
      <Switch>
        <Route path={home()} exact>
          <HomePage />
        </Route>
        <Route path={voting()}>
          <VotingPage />
        </Route>
        <Route path={createCategory()}>
          <CreateCategoryPage />
        </Route>
        <Route path={manage()}>
          <ManageDesiresPage />
        </Route>
        <Route path={login()}>
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

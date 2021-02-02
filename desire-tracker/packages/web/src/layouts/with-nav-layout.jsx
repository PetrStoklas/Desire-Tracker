import React from 'react';
import { Redirect, useParams } from "react-router-dom";
import { useFirestoreConnect } from "react-redux-firebase";
import firebase from "firebase/app";
// Locals
import { useAuthEmpty, useAuthLoaded } from "../firebase/hooks";
import GroupSelect from "../components/category/select";
import Menu from "../components/menu";
import { queries } from "../firebase/queries";
import useStyles from "./styles";

const WithNavLayout = ({ children }) => {
    const classes = useStyles();
    const loaded = useAuthLoaded();
    const empty = useAuthEmpty();
    const { categoryId } = useParams();

  useFirestoreConnect(
      !!categoryId
      ? [{
          collection: queries.groups,
          where: [firebase.firestore.FieldPath.documentId(), '==', categoryId],
          storeAs: queries.groups
        }] : []
  )

  if (!loaded) return <h1>Loading...</h1>

  if (empty) return <Redirect to="/login" />

  return (
      <>
          <div className={classes.topSection}>
            <GroupSelect />
          </div>
          <div className={classes.mainSection}>
            {children}
          </div>
          <Menu />
      </>
  )
}

export default WithNavLayout;

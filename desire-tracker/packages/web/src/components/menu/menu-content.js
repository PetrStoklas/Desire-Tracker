import React from 'react';
import { Link, useLocation, useParams  } from "react-router-dom";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
// Local
import { home, manage, voting } from "../../routes";

const MenuContent = ({ onClickCb }) => {
    const { categoryId } = useParams();
  const location = useLocation();

  return (
    <>
      <Button
        style={location.pathname === home() ? { color: 'red' } : null}
        component={Link}
        onClick={onClickCb}
        to="/"
      >
        Home
      </Button>
        <Button
            style={location.pathname === voting() ? { color: 'red' } : null}
            component={Link}
            onClick={onClickCb}
            to={voting(categoryId)}
        >
            Voting
        </Button>
      <Button
        style={location.pathname === manage() ? { color: 'red' } : null}
        component={Link}
        onClick={onClickCb}
        to={manage(categoryId)}
      >
        Manage
      </Button>
      <Button onClick={() => firebase.logout()}>Logout</Button>
    </>
  )
}

export default MenuContent;

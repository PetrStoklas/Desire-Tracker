import React from 'react';
import { useHistory, useParams } from "react-router-dom";
// Locals
import CreateDesireUi from "./create-desire-ui";
import { useAddDesire } from "../../../firebase/api/desire-api";
import { manage } from "../../../routes";

const initialState = {
  title: "",
  description: ""
}

const CreateDesire = () => {
  const { categoryId } = useParams();
  const addDesireToDB = useAddDesire();

  const { push } = useHistory();
  const [state, setState] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setState(initialState)
    push(manage(categoryId))
  }, [categoryId, push])

  const handleOnAdd = React.useCallback(async () => {
    setLoading(true)
    await addDesireToDB(state, categoryId)
    setLoading(false)
    handleClose()
  }, [categoryId, state, addDesireToDB, handleClose])

  const handleOnChange = React.useCallback((field, e) => {
    const newState = {
      ...state,
      [field]: e.target.value
    }

    setState(newState)
  }, [state])

  return <CreateDesireUi
    loading={loading}
    handleClose={handleClose}
    handleOnAdd={handleOnAdd}
    handleOnChange={handleOnChange}
    categoryId={categoryId}
    state={state}
  />
}

export default CreateDesire;

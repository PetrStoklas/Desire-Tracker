import React from 'react';
import { useHistory } from "react-router";
// Local
import { manage } from "../../../routes"
import { useCreateNewGroup } from "./api"
import NewGroupUi from "./new-group-ui";

const initialState = {
    title: ""
}

const NewGroupContainer = () => {
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState(initialState);

    const { goBack, push } = useHistory();
    const createNewGroup = useCreateNewGroup();

    const endCreation = React.useCallback(() => {
        setState(initialState)
        goBack()
    }, [goBack])

    const handleOnCancel = React.useCallback(() => {
        endCreation()
    }, [endCreation])

    const handleOnCreate = React.useCallback(async () => {
        setLoading(true)
        const newId = await createNewGroup(state)
        setLoading(false)

        newId && push(manage(newId))
    }, [createNewGroup, push, state])

    const handleOnChange = React.useCallback((e) => {
        const field = e.target.name
        const value = e.target.value

        const newState = { ...state, [field]: value }
        setState(newState)
    }, [state])

    return <NewGroupUi
        onCreate={handleOnCreate}
        onCancel={handleOnCancel}
        onChange={handleOnChange}
        loading={loading}
        open={true}
        state={state}
    />
}

export default NewGroupContainer;
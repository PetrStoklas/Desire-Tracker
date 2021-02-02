import React from 'react';
import { useHistory, useParams } from "react-router-dom";
// Locals
import { manage } from "../../../routes";
import { useUpdateDesire } from "../../../firebase/api/desire-api";
import { useData } from "../../../firebase/hooks";
import { queries } from "../../../firebase/queries";
import DesireDetailUi from "./desire-detail-ui";

const initialState = {
    title: "",
    description: ""
}

const DesireDetail = () => {
    const updateDesire = useUpdateDesire();
    const { desireId } = useParams();
    const { push } = useHistory();
    const [state, setState] = React.useState(initialState);
    const [loading, setLoading] = React.useState(false);
    const desire = useData(queries.myDesires, desireId)

    React.useEffect(() => {
        if (!state && desire) {
            setState({ ...desire })
        }
    }, [desire, state])

    const handleClose = React.useCallback(() => {
        setState(initialState)
        push(manage())
    }, [push])

    const handleOnUpdate = React.useCallback(async () => {
        setLoading(true)
        await updateDesire(desireId, state)
        setLoading(false)
        handleClose()
    }, [state, updateDesire, desireId, handleClose])

    const handleOnChange = React.useCallback((field, e) => {
        const newState = {
            ...state,
            [field]: e.target.value
        }

        setState(newState)
    }, [state])

    const handleOnKeyDown = React.useCallback(e => {
        // So we can use tab as in text editor
        if (e.code === "Tab") {
            e.preventDefault();
            setState({
                ...state,
                description: state.description + "    "
            })
        }
    }, [state])

    return (
        <DesireDetailUi
            handleOnChange={handleOnChange}
            handleOnUpdate={handleOnUpdate}
            handleClose={handleClose}
            handleOnKeyDown={handleOnKeyDown}
            loading={loading}
        />
    )
}

export default DesireDetail;

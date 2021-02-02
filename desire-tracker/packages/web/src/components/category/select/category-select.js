import React from 'react';
import { useHistory, useParams } from "react-router-dom";
// Local
import { useData } from "../../../firebase/hooks";
import { queries } from "../../../firebase/queries";
import { createCategory, selectCategory } from "../../../routes";
import CategorySelectUI from "./category-select-ui";
import useCustomSnackbar from "../../snackbar";

const CategorySelect = () => {
    const { push } = useHistory();
    const { enqueueSnackbar } = useCustomSnackbar();
    const { categoryId } = useParams();
    const me = useData(queries.me)
    const owningGroups = me && me.owningGroups

    const onChange = React.useCallback(({ target }) => {
        target.value !== "" && selectCategory(target.value)
    }, [])

    const onAddNew = React.useCallback(() => {
        if (!isNaN(owningGroups) && owningGroups < 3) {
            push(createCategory())
        } else {
            enqueueSnackbar("You are out of category slots. We are working on providing Gold Subscription plan to allow you use more space.", "info")
        }
    }, [enqueueSnackbar, owningGroups, push])

    return (
        <CategorySelectUI
            value={categoryId}
            onAddNew={onAddNew}
            onChange={onChange}
            groups={me && me.groups}
        />
    )
}

export default CategorySelect;
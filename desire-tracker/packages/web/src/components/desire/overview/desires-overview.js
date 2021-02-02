import React from 'react';
import { useHistory, useParams } from "react-router-dom";
// Mui
import { Delete } from "@material-ui/icons";
// Locals
import { addDesire, desireDetail, home } from "../../../routes";
import { useData } from "../../../firebase/hooks";
import { queries } from "../../../firebase/queries"
import { prepareDataForTable } from "./helpers";
import { useDeleteCategory } from "../../../firebase/api/category-api";
import { useDeleteDesire } from "../../../firebase/api/desire-api";
import DesiresOverviewUI from "./desires-overview-ui";

const columns = [
    {
        title: "Title",
        field: 'title'
    },
    {
        title: "Votes",
        field: 'votes'
    }
]

const actions = (onDelete) => [{
    icon: Delete,
    tooltip: 'Remove desire.',
    onClick: (event, rowData) => onDelete(rowData.id)
}]

// TODO: Unifiy naming (category x group)
const DesiresOverview = () => {
    const { categoryId } = useParams();
    const deleteCategory = useDeleteCategory();
    const deleteDesire = useDeleteDesire();
    const selectedGroup = useData(queries.groups, categoryId)
    const { push } = useHistory();

    const handleOnDeleteDesireClick = React.useCallback((desireId) => {
        deleteDesire(categoryId, desireId)
    }, [categoryId])

    const handleOnDeleteCategoryClick = React.useCallback(async () => {
        const id = await deleteCategory(categoryId)
        if (id) {
            push(home())
        }

    }, [categoryId, deleteCategory, push])

    const handleOnRowClick = React.useCallback((e, { id }) => {
        push(desireDetail(categoryId, id))
    }, [categoryId])

    const handleOnAddDesireClick = React.useCallback(() => {
        push(addDesire(categoryId))
    }, [categoryId])

    return (
        <DesiresOverviewUI
            data={selectedGroup ? prepareDataForTable(selectedGroup.desires) : []}
            actions={actions(handleOnDeleteDesireClick)}
            columns={columns}
            onRowClick={handleOnRowClick}
            onAddDesireClick={handleOnAddDesireClick}
            onDeleteCategoryClick={handleOnDeleteCategoryClick}
        />
    )
}

export default DesiresOverview;
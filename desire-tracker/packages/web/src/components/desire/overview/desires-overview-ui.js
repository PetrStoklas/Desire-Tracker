import React from 'react';
import { Route, Switch } from "react-router-dom";
// Material UI
import Button from "@material-ui/core/Button";
// Locals
import CreateDesire from "../create";
import Detail from "../detail/desire-detail";
import Table from "../../_general/table";
// Routes
import {addDesire, desireDetail} from "../../../routes";

const DesiresOverviewUI = ({ actions, data, columns, onRowClick, onDeleteCategoryClick, onAddDesireClick }) => {
    const addDataComponent = React.useMemo(() => <Button variant="outlined" onClick={onAddDesireClick}>Add</Button>, [onAddDesireClick])
    const deleteCategoryComponent = React.useMemo(() => <Button variant="outlined" onClick={onDeleteCategoryClick}>Delete Category</Button>, [onDeleteCategoryClick])

    return (
        <div>
            <Table
                actions={actions}
                data={data}
                columns={columns}
                toolbarProps={{ addDataComponent, deleteCategoryComponent , title: "My desires" }}
                onRowClick={onRowClick}
            />
            <Switch>
                <Route path={addDesire()}>
                    <CreateDesire />
                </Route>
                <Route path={desireDetail()}>
                    <Detail />
                </Route>
            </Switch>
        </div>
    )
}

export default DesiresOverviewUI;
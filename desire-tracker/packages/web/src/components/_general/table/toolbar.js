import React from 'react';
// Mui
import makeStyles from "@material-ui/core/styles/makeStyles";
import { MTableToolbar } from "material-table";

const useStyles = makeStyles(theme => ({
  toolbarWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    height: 40,
    padding: theme.spacing(1)
  }
}))

const Toolbar = ({ addDataComponent, deleteCategoryComponent, columns, title, ...restProps }) => {
  const classes = useStyles();

  return (
    <div className={classes.toolbarWrap}>
      <div>
        {addDataComponent}
        {deleteCategoryComponent}
      </div>
      <MTableToolbar
          columns={columns}
          title={title}
          {...restProps}
      />
    </div>
  )
}

export default Toolbar;
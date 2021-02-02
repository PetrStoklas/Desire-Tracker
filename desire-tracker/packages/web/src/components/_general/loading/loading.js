import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

// Local
import useStyles from "./styles";

const Loading = ({ size }) => {
  const classes = useStyles();

  return <CircularProgress size={size} className={classes.progress} />
};

export default Loading;
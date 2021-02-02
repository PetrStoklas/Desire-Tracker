import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  displayedSparkButton: {
    position: 'absolute',
    zIndex: 3333,
    bottom: 5,
    right: 5,
    border: 'black solid 1px',
    boxShadow: "-12px -9px 37px -24px rgba(0,0,0,0.75)"
  },
  closed: {
    visibility: 'hidden'
  }
})

const SparkButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <IconButton
      className={classes.displayedSparkButton}
      onClick={onClick}
    >
      <MenuIcon />
    </IconButton>
  )
}

export default SparkButton;

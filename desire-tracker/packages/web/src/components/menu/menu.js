import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
// Local
import MenuContent from "./menu-content";
import SparkButton from "./spark-button";

const useStyles = makeStyles({
  openMenu: {
    zIndex: 3300,
    width: '100%',
    height: '120%',
    backgroundColor: 'rgba(185, 185, 185, .9)',
    display: 'flex',
    flexDirection: 'column',
    top: '0',
    position: 'absolute',
  },
  closed: {
    visibility: 'hidden'
  }
})

const Menu = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOnLinkClick = React.useCallback(() => setOpen(false), [])

  return (
    <>
      <SparkButton onClick={() => setOpen(!open)}/>
      <div className={open ? classes.openMenu : classes.closed}>
          <MenuContent onClickCb={handleOnLinkClick} />
      </div>
    </>
  )
}

export default Menu;

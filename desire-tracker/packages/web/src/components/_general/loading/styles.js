import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  progress: {
    display: "block",
    margin: theme.spacing(0.3),
    marginLeft: "auto",
    marginRight: "auto",
    height: 60,
  }
}));

export default useStyles;
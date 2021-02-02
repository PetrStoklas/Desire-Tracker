import React from 'react';
import { Link, useParams } from "react-router-dom";
// Mui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
// Locals
import { queries } from "../../firebase/queries"
import { useData } from "../../firebase/hooks"
import { useVoteForDesire } from "./api";
import { addDesire } from "../../routes";
import Item from "./item";

const useStyles = makeStyles({
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    margin: 'auto auto',
    border: '1px red solid',
    borderRadius: 7,
    padding: 15,
  }
})

const Voting = () => {
  const { categoryId } = useParams();
  const classes = useStyles();
  const selectedGroup = useData(queries.groups, categoryId)
  const voteForDesire = useVoteForDesire(categoryId);
  const desires = selectedGroup ? selectedGroup.desires : {}
  const desireKeys = Object.keys(desires || {})

  return (
      <div className={classes.wrap}>
        {desireKeys.map(key => (
          <React.Fragment key={key}>
            <Item desire={desires[key]} onVote={() => voteForDesire(key)}/>
            <br />
          </React.Fragment>
        ))}
        {(!desireKeys.length) && <Typography variant="h5">No desires - <Link to={addDesire(categoryId)}>Click to add new one.</Link></Typography>}
      </div>
  )
}

export default Voting;

import React from 'react';
// Material Ui
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Item = ({ desire, onVote }) => {
  return (
      <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
        >
          <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Button onClick={onVote}><FavoriteBorderIcon /></Button>}
              label={desire.title}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            {`${desire.description}`}
          </Typography>
        </AccordionDetails>
      </Accordion>
  )
}

export default Item;

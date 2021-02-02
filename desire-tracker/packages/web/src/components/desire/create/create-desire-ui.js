import React from 'react';
import { Link } from "react-router-dom";
// Material UI
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// Locals
import { voting } from "../../../routes";
import MyDialog from "../../_general/dialog";
import Loading from "../../_general/loading";

const CreateDesireUi = ({
  handleClose,
  handleOnAdd,
  handleOnChange,
  loading,
  categoryId,
  state
}) => {
  const dialogActions = React.useMemo(() => {
    return (
      <>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleOnAdd} color="primary">
          {loading ? <Loading /> : 'Add'}
        </Button>
      </>
    )
  }, [handleClose, handleOnAdd, loading])

  return (
    <MyDialog
      open={true}
      onClose={handleClose}
      title="Add new desire"
      actions={dialogActions}
    >
      <DialogContentText>
        You will be able to vote for your new desire at <Link to={voting(categoryId)}>here</Link>.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Title"
        fullWidth
        value={state.title}
        onChange={e => handleOnChange("title", e)}
      />
    </MyDialog>
  )
}

export default CreateDesireUi;

import React from 'react';
// Mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Locals
import Loading from "../../_general/loading";

const DesireDetailUi = ({ handleClose, handleOnChange, handleOnKeyDown, handleOnUpdate, loading, state }) => {
    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle id="form-dialog-title">Detail</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={state.title}
                    onChange={e => handleOnChange("title", e)}
                />
                <TextField
                    onKeyDown={handleOnKeyDown}
                    margin="dense"
                    id="description"
                    label="Description"
                    variant="outlined"
                    rows={8}
                    fullWidth
                    multiline
                    value={state.description}
                    onChange={e => handleOnChange("description", e)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleOnUpdate} color="primary">
                    {loading ? <Loading /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DesireDetailUi;

import React from 'react';
// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loading from "../../_general/loading";


const NewGroupUi = ({ onCreate, onCancel, onChange, loading, state, open }) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle id="form-dialog-title">Create new group</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can have multiple groups of desires.
                </DialogContentText>
                <TextField
                    autoFocus
                    name="title"
                    margin="dense"
                    id="title"
                    label="Title"
                    fullWidth
                    value={state.title}
                    onChange={onChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={onCreate} color="primary">
                    {loading ? <Loading /> : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewGroupUi;
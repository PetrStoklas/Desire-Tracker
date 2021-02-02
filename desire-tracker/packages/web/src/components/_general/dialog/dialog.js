import React from 'react';
// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const MyDialog = ({ actions, children, title, open = false, onClose = () => {} }) => (
  <Dialog open={open} onClose={onClose}>
    {title && <DialogTitle>{title}</DialogTitle>}
    {children && <DialogContent>{children}</DialogContent>}
    {actions && <DialogActions>{actions}</DialogActions>}
  </Dialog>
)

export default MyDialog;

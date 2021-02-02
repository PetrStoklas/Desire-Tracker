import React from "react";
import { useSnackbar } from "notistack";

// Material UI
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useCustomSnackbar = () => {
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();
    const action = (key) => (
        <IconButton onClick={() => closeSnackbar(key)}>
            <CloseIcon />
        </IconButton>
    );

    const editedEnqueue = (message, variant) =>
        enqueueSnackbar(message, {
            action,
            variant,
            persist: variant === "error",
        });

    return { closeSnackbar, enqueueSnackbar: editedEnqueue };
};

export default useCustomSnackbar;

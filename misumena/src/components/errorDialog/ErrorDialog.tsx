import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";

const ErrorDialog = () => {
    const socketContext = useContext(SocketContext);
    const [displayDialog, setDisplayDialog] = useState<boolean>(false);

    useEffect(() => {
        if (socketContext.state.isError) setDisplayDialog(true);
    }, [socketContext.state.isError])

    const aknowledgeError = () => {
        setDisplayDialog(false);
        socketContext.dispatch({ type: "errorAknowledged" });
    }
    return (
        <Dialog
            open={displayDialog}

        // title={"An error occured"}
        >
            <div style={{color:"white",background: "linear-gradient(to right bottom, hsl(236, 50%, 50%), hsl(195, 50%, 50%))" }} >
                <DialogTitle >An error occured</DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1">
                        {socketContext.state.error}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button style={{color:"white"}} onClick={aknowledgeError}>OK</Button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default ErrorDialog;
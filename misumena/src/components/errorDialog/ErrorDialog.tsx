import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, Button, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";

const ErrorDialog = () => {
    const socketContext = useContext(SocketContext);
    const [displayDialog, setDisplayDialog] = useState<boolean>(false);
    const cancelRef = useRef<HTMLButtonElement>();

    useEffect(() => {
        if (socketContext.state.isError) setDisplayDialog(true);
    }, [socketContext.state.isError])

    const aknowledgeError = () => {
        setDisplayDialog(false);
        socketContext.dispatch({ type: "errorAknowledged" });
    }
    return (
        <AlertDialog
            isOpen={displayDialog}
            onClose={aknowledgeError}
            leastDestructiveRef={cancelRef}
        >
            <div style={{color:"white",background: "linear-gradient(to right bottom, hsl(236, 50%, 50%), hsl(195, 50%, 50%))" }} >
                <AlertDialogHeader >
                    <Heading>
                    An error occured
                    </Heading>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text>
                        {socketContext.state.error}
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button style={{color:"white"}} ref={cancelRef} onClick={aknowledgeError}>OK</Button>
                </AlertDialogFooter>
            </div>
        </AlertDialog>
    )
}

export default ErrorDialog;
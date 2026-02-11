import { Box, Text } from "@chakra-ui/react"
import { useContext } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";

export const RoomState = ({ disabled } : {disabled: boolean}) => {
    const { state, dispatch } = useContext(SocketContext);
    const currentPlayer = state.room?.users.find(user => user.id === state.room?.currentTurnUserId)
    const waitToStart = state.room?.roomState === "idle"
    const ThreeDotAnim = () =>{
        return (
            <span className="threeDotAnim"/>
        )
    }
    if (waitToStart) {
        return (
            <Box className="roomState">
                <Text>
                    Waiting for Admin to start the game 
                    <ThreeDotAnim />
                </Text>
            </Box>
        )
    }

    if (currentPlayer !== state.currentUser) {
        return (
            <Box className="roomState">
                <Text>
                    Waiting for {currentPlayer?.name} to submit a word 
                    <ThreeDotAnim />
                </Text>
            </Box>
        )
    } else {
        return (
            <Box className="roomState">
                <Text>Your turn to submit a word!</Text>
            </Box>
        )
    }
}
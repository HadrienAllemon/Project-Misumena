import { Box, Text } from "@chakra-ui/react"

export const RoomState = ({ disabled } : {disabled: boolean}) => {

    return (
        <Box className="roomState Sunday">
            {disabled ? <Text>Waiting for other players...</Text> : <Text>Your turn to submit a word!</Text>}
        </Box>
    )
}
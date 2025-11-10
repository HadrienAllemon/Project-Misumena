import { Box, Flex, Grid, GridItem, Img } from "@chakra-ui/react";
import { IUser } from "models/IUser";
import React, { useContext } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";
import avatarPlaceholder from "assets/avatars/avatar0.png";
import aquaBG from "assets/playerTile/aquaBG.jpg"

interface IPlayerTileProps {
    user: IUser;
    isAdmin: boolean;
    bg?: string;
    score?: number;
}

const PlayerTile: React.FC<IPlayerTileProps> = ({ user, isAdmin, bg }) => {
    const { state } = useContext(SocketContext);
    const isCurrentUser = state.currentUser?.id === user.id
    const renderCurrentWord = () => {
        return (
            <Box height="50px" >
                {
                    isCurrentUser && state.currentUser?.assignedWord?.length &&
                    <div>Your word : {state.currentUser?.assignedWord}</div>
                }
            </Box>
        );
    }
    return (
        <Box flexGrow={1} maxW={"30rem"} height={"100%"} padding={"2rem"} pos={"relative"} overflow={"hidden"} borderRadius="10px" marginTop="3rem" boxShadow={"inset 0 0 62px rgba(0, 2, 115, 0.77)"}>
            <Box className="BGHandler" background={`url(${aquaBG})`} backgroundSize={"cover"} height={"100%"} width={"100%"} position={"absolute"} top={0} left={0} zIndex={-1} hueRotate={"0deg"} filter={"hue-rotate(0deg) saturate(0.7) blur(1.5px)"}/>
            {/* <GridItem style={{ border: "1px solid black" }} width={"100%"} borderRadius={"10px"} > */}
            <Flex justifyContent={"space-between"} alignItems="center" marginBottom="1rem">
                <Img src={avatarPlaceholder} alt="User Avatar" boxSize="100px" borderRadius="full" marginRight="1rem" />
                <Box textAlign={"right"} fontSize={"1.2rem"}>
                    <Box height="20px" >
                        {isAdmin && <Box style={{ color: "crimson", fontWeight: "bold" }}>ADMIN</Box>}
                    </Box>
                    <Box style={{ fontWeight: isCurrentUser ? "bold" : "inherit" }} className="Sunday" >{user.name}</Box>
                    <Box>Score : {user.score || 0}</Box>
                </Box>
            </Flex>

            {renderCurrentWord()}
            <h2>Guesses :</h2>

            <div style={{ background: "#CC8b2299" }} >{state.room?.currentGuesses[user?.id]?.map((word) => <div>{word}</div>)}</div>
            {/* </GridItem> */}
        </Box>
    )
}

export default PlayerTile;
import { Box, Flex, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import { IUser } from "models/IUser";
import React, { useContext } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";
import avatarPlaceholder from "assets/avatars/avatar0.png";
import aquaBG from "assets/playerTile/gradientPlayerTile.png"

interface IPlayerTileProps {
    user: IUser;
    isAdmin: boolean;
    score?: number;
    index?: number
}

const PlayerTile: React.FC<IPlayerTileProps> = ({ user, isAdmin, index = 0 }) => {
    const { state } = useContext(SocketContext);
    const isCurrentUser = state.currentUser?.id === user.id
    const renderCurrentWord = () => {
        return (
            <Box className="word-box" >
                {
                    isCurrentUser && state.currentUser?.assignedWord?.length ?
                    <>
                        <div>Your word:</div>
                        <div className="secret-word">{state.currentUser?.assignedWord}</div>
                    </>
                    :
                    <>
                        <div>{user.name} Word:</div>
                        <div className="secret-word">*********</div>
                    </>
                }
            </Box>
        );
    }
    function renderGuesses(): React.ReactNode {
        return (
            <div className="guesses-box" >
                <div className="guesses-header" >
                    <span className="left-line"></span>
                    <h2>Guesses </h2>
                    <span className="right-line"></span>
                </div>
                <div className="guesses-list" >
                    {state.room?.currentGuesses[user?.id]?.map((word) => <div className="guesses-list-item">{word}</div>)}
                </div>
            </div>
        )

    }

    return (
        <Box flexGrow={1} maxW={"30rem"} height={"100%"} padding={"2rem"} pos={"relative"} overflow={"hidden"} borderRadius="10px" marginTop="3rem" boxShadow={"0 0 100px rgba(0,0,0,0.6) inset , 10px 2px 30px rgba(0,0,0,0.5)"} border={"2px solid rgba(33,33,99, .9)"} >
            <Box className="BGHandler" background={`url(${aquaBG})`} backgroundSize={"cover"} height={"100%"} width={"100%"} position={"absolute"} top={0} left={0} zIndex={-1} hueRotate={"0deg"} filter={`hue-rotate(${index * 137.5}deg)`} />
            <Flex justifyContent={"space-between"} alignItems="center" marginBottom="1rem">
                <Box  >
                    <Img src={avatarPlaceholder} alt="User Avatar" boxSize="100px" borderRadius="full" marginRight="1rem" />
                </Box>
                <Box height={"130px"}>
                    <Box style={{ fontWeight: isCurrentUser ? "bold" : "inherit" }} className="Sunday" fontSize={"50px"} color="white" textShadow={"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}>{user.name}</Box>
                    {isAdmin && <Box height="27px" style={{ color: "white", fontWeight: "bold", background: "rgba(0,0,0,.3)", borderRadius: "10px", width: "auto" }}>
                        <Text className="admin-text" >
                            ADMIN
                        </Text>
                    </Box>
                    }
                    <Box>Score : {user.score || 0}</Box>
                </Box>
            </Flex>

            {renderCurrentWord()}
            {renderGuesses()}
        </Box>
    )
}

export default PlayerTile;
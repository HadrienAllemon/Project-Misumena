import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";
import PlayerTile from "./playerTile/PlayerTile";
import ResultsTile from "./resultsTile/ResultsTile";
import ScoreBoard from "./scoreBoard/scoreBoard";
import VoteTile from "./voteTile/VoteTile";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { PlayerSubmit } from "./playerTile/PlayerSubmit";

const PlayRoom = () => {
    const { state, dispatch } = useContext(SocketContext);
    const [word, setWord] = useState<string>("");
    const isAdmin = state?.currentUser?.id === state?.room?.userAdmin?.id

    const submitWord = () => {
        dispatch({ type: "submitWord", word: word });
        setWord("");
    }

    const startGame = () => {
        dispatch({ type: "startGame" });
    }

    const bgColors = import.meta.env.VITE_BG_COLORS?.split(",");

    return (
        <Flex flexDir={"column"} justifyContent={"space-between"} height="100%">
            <Flex justifyContent={"center"} gap={"1.5rem"} flexWrap={"wrap"} flexGrow={1} maxH="50vh" padding={"0 2rem"}>
                {state.usersInRoom.map((user, i) =>
                    <PlayerTile isAdmin={user.id === state?.room?.userAdmin?.id} user={user} index={i} score={user.score} />
                )}
            </Flex>
            <Box>
                <ResultsTile />
            </Box>
            {/* <VoteTile /> */}
            <Box>
                <PlayerSubmit />
            </Box>
        </Flex>
    )
}

export default PlayRoom;
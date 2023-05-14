import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";
import PlayerTile from "./playerTile/PlayerTile";
import ResultsTile from "./resultsTile/ResultsTile";
import ScoreBoard from "./scoreBoard/scoreBoard";
import VoteTile from "./voteTile/VoteTile";
import { Button, Flex, Input } from "@chakra-ui/react";

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

    return (
        <div>
            <Flex>
                {state.usersInRoom.map((user) =>
                    <PlayerTile isAdmin={user.id === state?.room?.userAdmin?.id} user={user} len={12 / state.usersInRoom.length} />
                )}
            </Flex>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Input value={word} variant="outlined" onChange={(ev) => setWord(ev.currentTarget.value)}></Input>
                <Button onClick={submitWord} disabled={!state.currentUser.isHisTurn || state.room.roomState !== "ongoing"}>GO</Button>
                <Button onClick={startGame} disabled={!isAdmin}>Start Game</Button>
            </div>
            <VoteTile />
            <ResultsTile />
            <ScoreBoard />
        </div>
    )
}

export default PlayRoom;
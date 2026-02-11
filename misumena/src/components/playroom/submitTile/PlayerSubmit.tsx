import { Flex, Input, Button, Box, Checkbox } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";
import "./PlayerSubmit.css";
import { RoomState } from "./RoomState";

export const PlayerSubmit = () => {
    const [word, setWord] = useState<string>("");
    const { state, dispatch } = useContext(SocketContext);
    const disabled = !state.currentUser?.isHisTurn || state.room?.roomState !== "ongoing"
    const [voting, setVoting] = useState<boolean>(false);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [userGuessed, setUserGuessed] = useState<string>("");
    const [wordGuessed, setWordGuessed] = useState<string>("");
    const bgColors = import.meta.env.VITE_BG_COLORS?.split(",");


    const isAdmin = state?.currentUser?.id === state?.room?.userAdmin?.id
    const submitWord = () => {
        dispatch({ type: "submitWord", word: word });
        setWord("");
    }

    const startGame = () => {
        dispatch({ type: "startGame" });
    }

    const onVoteClick = () => {
        if (state.room?.roomState === "ongoing") dispatch({ type: "callVote" });
    }
    const getCallerName = () => {
        if (state.room?.voteState?.caller?.name) return `${state.room.voteState.caller.name} called a vote !`;
        else return "all guessed were made, the vote started !";
    }

    return (
        <Flex flexDir={"column"} alignItems={"center"} gap={"2rem"} justifyContent={"space-around"} paddingBottom="2rem">
            <RoomState disabled={disabled} />
            <Flex gap={"1rem"}>
                <Input value={word} variant="outlined" isDisabled={disabled} onChange={(ev) => setWord(ev.currentTarget.value)} maxW={"20rem"}></Input>
                <Button onClick={submitWord} isDisabled={disabled}>Submit</Button>
            </Flex>
            {state.room?.roomState !== "voting" &&
                <Flex gap={"1rem"}>
                    <Button className="button-29" onClick={startGame} isDisabled={!isAdmin}>Start Game</Button>
                    <Button className="button-29 button-30" disabled={hasVoted} onClick={onVoteClick}>{voting ? "Confirm" : "Call a vote !"}</Button>
                </Flex>
            }
            {
                state.room?.roomState === "voting" &&
                <Box>
                    <Box>
                        {getCallerName()}
                    </Box>
                    <Flex gap={"1rem"}>
                        {state.room?.users?.map((user, i) =>
                            <Box height="3rem" width="3rem" background={bgColors[i]}>
                                {user.name}
                                <Checkbox checked={userGuessed === user.id} onChange={() => setUserGuessed(user.id)} />
                            </Box>
                        )}
                    </Flex>
                    <Input onChange={(event) => setWordGuessed(event.currentTarget.value)} placeholder="(optional) you can try and guess what the intruder's word is" />
                </Box>
            }
        </Flex>
    )
}
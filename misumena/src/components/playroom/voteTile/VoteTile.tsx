import { Button, Checkbox, Input } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";

const VoteTile = () => {
    const [voting, setVoting] = useState<boolean>(false);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const { state, dispatch } = useContext(SocketContext);
    const [userGuessed, setUserGuessed] = useState<string>("");
    const [wordGuessed, setWordGuessed] = useState<string>("");
    useEffect(() => {
        setVoting(state.room.roomState === "voting");
    }, [state.room?.roomState]);

    const onVoteClick = () => {
        if (!voting) dispatch({ type: "callVote" });
        else {
            dispatch({ type: "confirmVote", userGuessed: userGuessed, wordGuessed: wordGuessed });
            setHasVoted(true);
        }
    }

    const getCallerName = () => {
        if (state.room?.voteState?.caller?.name) return `${state.room.voteState.caller.name} called a vote !`;
        else return "all guessed were made, the vote started !";
    }

    return (
        <div style={{ textAlign: "left" }}>
            <Button disabled={hasVoted} onClick={onVoteClick}>{voting ? "Confirm" : "Call a vote !"}</Button>
            {
                voting &&
                <div>
                    {getCallerName()}
                    {state.room?.users?.map(user =>
                            <Checkbox checked={userGuessed === user.id} onChange={() => setUserGuessed(user.id)} />
                    )}
                    <Input onChange={(event) => setWordGuessed(event.currentTarget.value)} placeholder="(optional) you can try and guess what the intruder's word is" />
                </div>
            }
        </div>
    )
}

export default VoteTile;
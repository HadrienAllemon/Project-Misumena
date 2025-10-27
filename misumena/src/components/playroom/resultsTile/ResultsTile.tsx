import React, { useContext } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";

const ResultsTile = () => {
    const { state, dispatch } = useContext(SocketContext)

    if (state?.room?.roomState !== "results" || !state.room.results) return null;
    const {
        users_accusations,
        intruder,
        intruderWord,
        othersWord,
        scoreModification
    } = state.room.results!;

    const getAccusation = () => {
        return Object.keys(users_accusations).map(userId => {
            const correspondingUser = state?.room?.usersPlaying?.find(user => user.id === userId);
            const correspondingAcusee = state?.room?.usersPlaying?.find(user => user.id === users_accusations[userId]);
            if (correspondingUser)
                return <div key={userId}>
                    <div>
                        {correspondingUser.name} voted for {correspondingAcusee.name}
                    </div>
                    <div>
                        Score : {scoreModification[userId]}
                    </div>
                </div>
        })
    }

    return (
        <div>
            <div>The intruder word was {intruderWord}</div>
            <div>Others' word was {othersWord}</div>
            <div>
                {getAccusation()}
            </div>
        </div>
    )
}

export default ResultsTile;
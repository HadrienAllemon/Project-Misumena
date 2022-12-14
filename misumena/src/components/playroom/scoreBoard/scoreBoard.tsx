import React, { useContext } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";

const ScoreBoard = () => {
    const {state,dispatch} = useContext(SocketContext);
    return (
        <div>
            {state.room?.usersPlaying?.map((user)=>(
                <div>
                    {user.name} : {user.score || 0}
                </div>
            ))}
        </div>
    )
}

export default ScoreBoard;
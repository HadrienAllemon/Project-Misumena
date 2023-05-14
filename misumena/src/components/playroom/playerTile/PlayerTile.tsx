import { Grid, GridItem } from "@chakra-ui/react";
import { IUser } from "models/IUser";
import React, { useContext } from "react";
import { SocketContext } from "src/contexts/socket/SocketContext";

interface IPlayerTileProps {
    user: IUser;
    len:number;
    isAdmin:boolean;
}

const PlayerTile: React.FC<IPlayerTileProps> = ({ user, len, isAdmin }) => {
    const {state} = useContext(SocketContext);
    const isCurrentUser = state.currentUser.id === user.id
    const renderCurrentWord = () => {
        return isCurrentUser && state.currentUser.assignedWord?.length && 
            <div>Your word : {state.currentUser.assignedWord}</div>
    }
    return (
        <GridItem style={{ border: "1px solid black" }}>
            {renderCurrentWord()}
            {isAdmin ? <div style={{ color: "crimson", fontWeight: "bold", height:"50px" }}>ADMIN</div> : <div style={{height:"50px"}}></div>}
            <div style={{ background: "#228b2299", fontWeight:isCurrentUser ? "bold" : "inherit" }} >{user.name}</div>
            <div style={{ background: "#CC8b2299" }} >{state.room?.currentGuesses[user?.id]?.map((word) => <div>{word}</div>)}</div>
        </GridItem>
    )
}

export default PlayerTile;
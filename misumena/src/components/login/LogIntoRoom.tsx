import * as React from "react";
import { useContext, useState } from "react";
import { SocketContext } from "../../contexts/socket/SocketContext";
import { useParams } from "react-router-dom";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const LogIntoRoom = (props) => {
    const { socket, dispatch } = useContext(SocketContext);
    const [playerName, setPlayerName] = useState<string>("");
    const {room} = useParams();
    console.log(room);
    const login = () => {
        dispatch({type:"login", name:playerName, room:room})
    }
    return (
        <div style={{display:"flex", flexDirection:"column", width:"350px", margin:"auto"}}>
            <FormControl>
            <FormLabel>What should we call you ?</FormLabel>
            <Input value={playerName} onChange={(event) => setPlayerName(event.target.value)} id="standard-basic"  variant="standard" />
            <Button onClick={login} style={{width:"60px"}} variant="contained">
                GO
            </Button>
            </FormControl>
        </div>
    )
}

export default LogIntoRoom
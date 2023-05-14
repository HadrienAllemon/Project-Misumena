import * as React from "react";
import { useContext, useState } from "react";
import { SocketContext } from "../../contexts/socket/SocketContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sun from "../../img/sun.png";
import { Button, Card, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Login = () => {
    const { socket, state, dispatch } = useContext(SocketContext);
    const [playerName, setPlayerName] = useState<string>("");
    const [playerRoom, setPlayerRoom] = useState<string>("");
    const navigate = useNavigate();
    const login = () => {
        dispatch({ type: "login", name: playerName, room: playerRoom })
    }
    useEffect(() => {
        if (state.room?.id?.length) navigate(`/${state.room.id}`);
    }, [state.room])
    return (
        <div style={{ height: "100vh", width: "100vw", backgroundImage: `url(${sun})`, backgroundSize: "cover", backgroundPosition: "center" }} >
            <div style={{ display: "flex", flexDirection: "column", width: "350px", margin: "auto" }}>
                <Card>
                    <FormControl>
                        <FormLabel>What should we call you ?</FormLabel>
                        <Input value={playerName} onChange={(event) => setPlayerName(event.target.value)} id="standard-basic" variant="standard" />
                        <FormLabel>join a specific room</FormLabel>
                        <Input value={playerRoom} onChange={(event) => setPlayerRoom(event.target.value)} id="standard-basic" variant="standard" />
                        <Button onClick={login} style={{ width: "60px" }} variant="contained">
                            GO
                        </Button>
                    </FormControl>
                </Card>
            </div>
        </div>

    )
}

export default Login
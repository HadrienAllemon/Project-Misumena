import * as React from "react";
import { useContext, useState } from "react";
import { SocketContext } from "../../contexts/socket/SocketContext";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import {PlayArrow} from '@mui/icons-material';
import { useParams } from "react-router-dom";

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
            <TextField value={playerName} onChange={(event) => setPlayerName(event.target.value)} id="standard-basic" label="What should we call you ?" variant="standard" />
            <Button onClick={login} style={{width:"60px"}} variant="contained" endIcon={<PlayArrow />}>
                GO
            </Button>
        </div>
    )
}

export default LogIntoRoom
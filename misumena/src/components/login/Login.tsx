import * as React from "react";
import { useContext, useState } from "react";
import { SocketContext } from "../../contexts/socket/SocketContext";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import {PlayArrow} from '@mui/icons-material';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { socket, state, dispatch } = useContext(SocketContext);
    const [playerName, setPlayerName] = useState<string>("");
    const [playerRoom, setPlayerRoom] = useState<string>("");
    const navigate  = useNavigate();
    const login = () => {
        dispatch({type:"login", name:playerName, room:playerRoom})
    }
    useEffect(()=>{
        if (state.room?.id?.length) navigate(`/${state.room.id}`);
    },[state.room])
    return (
        <div style={{display:"flex", flexDirection:"column", width:"350px", margin:"auto"}}>
            <TextField value={playerName} onChange={(event) => setPlayerName(event.target.value)} id="standard-basic" label="What should we call you ?" variant="standard" />
            <TextField value={playerRoom} onChange={(event) => setPlayerRoom(event.target.value)} id="standard-basic" label="join a specific room" variant="standard" />
            <Button onClick={login} style={{width:"60px"}} variant="contained" endIcon={<PlayArrow />}>
                GO
            </Button>
        </div>
    )
}

export default Login
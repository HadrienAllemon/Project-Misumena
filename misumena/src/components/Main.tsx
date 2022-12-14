import * as React from "react";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { SocketContext } from "src/contexts/socket/SocketContext";
import { IUser } from "../models/IUser";
import ErrorDialog from "./errorDialog/ErrorDialog";
import Login from "./login/Login";
import LogIntoRoom from "./login/LogIntoRoom";
import PlayRoom from "./playroom/PlayRoom";

const Main = () => {
    const { state } = useContext(SocketContext)
    return (
        <div className="App">
            <ErrorDialog />
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/:room" element={
                    state.room ? 
                    <PlayRoom /> :
                    <LogIntoRoom />
                } />
            </Routes>
        </div>
    )
}

export default Main;
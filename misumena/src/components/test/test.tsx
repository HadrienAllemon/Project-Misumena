import * as React from "react";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../contexts/socket/SocketContext";

const Test = () => {
    const { socket } = useContext(SocketContext);
    useEffect(() => {
        if (socket) {
            console.log("== init notif ==");
            socket.on("notification", notif => {
                console.log("notif", notif)
                window.alert(notif?.description)
            })
        }
    }, [socket])
    const connect = () => {
        console.log("connection");
        socket?.emit("connection");
    }

    const sendMessage = () => {
        socket?.emit("SendMessage", "Hello World !");
    }

    const addUser = (name: string, roomId: string) => {
        socket?.emit("login", { name: name, room: roomId }, console.log);
    }

    return (
        <div className="App">
            <button onClick={sendMessage}>Send message</button>
            <button onClick={connect}>connect</button>
            <button onClick={() => addUser("Hadrien", "room1")}>newUser</button>
        </div>
    )
}

export default Test;
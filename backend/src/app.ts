import express from "express";
import * as socketio from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ClientToServerEvents, ServerToClientEvents } from "shared";
import SocketState from "./state/SocketState";
import {login, logout} from "./socket/LoginLogout/LoginLogout";
import { callVote, confirmVote, StartGame, SubmitWord,  } from "./socket/GameAction/GameAction";
import { IUser } from "./models/IUser";
const bodyParser = require("body-parser");
const app = express();




// Running our server on port 3080
const PORT = process.env.PORT || 3080

const server = app.listen(PORT, function() {
  console.log('Listening at http://%s:%s', 'localhost:', PORT);
});


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var io:socketio.Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any> = new socketio.Server(server)


// const rooms:string[] = [];

io.on('connection', async (client) => {
    console.log("New client connected", client.id);
    SocketState.io = io;
    // SocketState.client = client;
    
    
    client.on("login", (...args)=>login(...args, client));
    client.on("disconnect", (...args)=>logout(...args, client));
    client.on("submitWord", (...args) => SubmitWord(...args, client));
    client.on("startGame", (...args) => StartGame(...args, client));
    client.on("callVote", (...args) => callVote(client))
    client.on("confirmVote", (...args) => confirmVote(...args, client));
  
    // //Client entered The chat Room
    // client.on("UserEnteredRoom", (userData) => {
    //   var enteredRoomMessage:roomMessage = {message: `${userData.username} has entered the chat`, username: "", userID: 0, timeStamp: 0}
    //   chatRoomData.push(enteredRoomMessage)
    //   sendUpdatedChatRoomData(client)
    //   connectedClients[client.id] = userData
  
    // })
  
    // //Creating identity for new connected user
    // client.on("CreateUserData", () => {
    //   let userID = uuid();
    //   let username = uniqueNamesGenerator({ dictionaries: [adjectives, names] });
    //   var userData = {userID: userID, username: username}
    //   client.emit("SetUserData", userData)
    // })
  
  
    // //Player Disconnecting from chat room...
    // client.on('disconnecting', ({user}) => {
    //   deleteUser(user);
    //   if (getUsers(user.room))
    // });

  
    // //Clearing Chat room data from server
    // client.on('ClearChat', () => {
    //   chatRoomData=[]
    //   console.log(chatRoomData)
    //   sendUpdatedChatRoomData(client)
    // })
})

//Sending update chat room data to all connected clients
// function sendUpdatedChatRoomData(client:socketio.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>  ){
//     client.emit("RetrieveChatRoomData", chatRoomData)
//     client.broadcast.emit("RetrieveChatRoomData", chatRoomData)
//   }
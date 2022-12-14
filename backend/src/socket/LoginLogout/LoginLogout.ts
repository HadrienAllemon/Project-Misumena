import { createRandomString } from "../../miscfunctions/miscfunctions";
import { loginCallBack, SocketClient } from "../../shared/SocketModels";
import SocketState from "../../state/SocketState";
import { addRoomIfNew, deleteRoom } from "../Rooms/RoomsAction";
import { addUser, deleteUser, getUser, getUsers } from "../users/UsersAction";


interface socketArgs {
  name: string;
  room: string;
}

const login = async ({ name, room }: socketArgs, callback: (user: loginCallBack) => void, client : SocketClient) => {
  if (!client || !SocketState.io) return;
  if (!room?.length) {
    room = createRandomString(SocketState.rooms.length);
  }

  const user = addUser(client.id, name, room);
  const NewRoom = addRoomIfNew(room, user);
  client.join(user.room);
  const usersInRoom = getUsers(room);

  SocketState.io.in(room).emit("notification", { title: "New Participant", description: `${user!.name} joined the room !` });
  SocketState.io.in(room).emit('users', usersInRoom);

  console.log("users > ", getUsers(user.room));
  console.log("rooms > ", SocketState.rooms);

  callback({ users: usersInRoom, room: NewRoom, currentUser: user });
  client.emit("loginSuccess", { users: usersInRoom, room: NewRoom, currentUser: user })
};

const logout = (reason: string, client: SocketClient) => {
  if (!client || !SocketState.io) return;
  console.log("User disconnected ", reason);
  const disconnectedUser = getUser(client.id);
  if (!disconnectedUser) return;
  deleteUser(disconnectedUser.id);
  if (getUsers(disconnectedUser.room).length === 0) {
    deleteRoom(disconnectedUser.room);
    console.log(SocketState.rooms);
  }
  else {
    SocketState.io.in(disconnectedUser.room).emit("notification", { title: "A participant left", description: `${disconnectedUser.name} left the room.` });
    SocketState.io.in(disconnectedUser.room).emit('users', getUsers(disconnectedUser.room));
    console.log(SocketState.rooms);
    console.log(getUsers(disconnectedUser.room));
  }
}

export { login, logout };
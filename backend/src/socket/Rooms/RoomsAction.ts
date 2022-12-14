import { IUser } from "../../models/IUser"
import SocketState from "../../state/SocketState";
import { Room } from "../../objects/Room";

export const addRoomIfNew = (roomId: string, user: IUser) => {
    let newOrExistingRoom = SocketState.rooms.find(existingRoom => existingRoom.id === roomId);
    if (!newOrExistingRoom) {
        newOrExistingRoom = new Room(roomId, [user])
        SocketState.rooms.push(newOrExistingRoom);
    }
    else {
        newOrExistingRoom.users.push(user);
    }
    return newOrExistingRoom;
}

export const deleteRoom = (roomId:string) => {
    SocketState.rooms.splice(SocketState.rooms.findIndex(room => room.id === roomId), 1);
}

// export const startGame = (roomId:string) => {
//     SocketState.rooms.find(room => room.id === roomId)?.startGame();
// }
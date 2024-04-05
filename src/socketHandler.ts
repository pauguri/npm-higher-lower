import { Socket, io } from "socket.io-client";
import { Package } from "./@types/types";
import { Response } from "./@types/types";

export default class SocketHandler {
  socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000');
  }


  getPackage = async (): Promise<Package | null> => {
    const response: Response = await this.socket.emitWithAck('get-package');
    if (response.status === 200) {
      return response.data as Package;
    } else {
      console.log(response.data);
      return null;
    }
  }

  disconnect = () => {
    this.socket.disconnect();
  }
}
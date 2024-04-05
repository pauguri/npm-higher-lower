import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Package } from "../@types/types";
import SocketHandler from "../socketHandler";

export default function Game() {
  const [socket, setSocket] = useState<SocketHandler | null>(null);
  const [refPkg, setRefPkg] = useState<Package | null>(null);
  const [nextPkg, setNextPkg] = useState<Package | null>(null);

  useEffect(() => {
    const socket = new SocketHandler();
    setSocket(socket);

    socket.getPackage().then((pkg) => {
      setRefPkg(pkg);
    });

    socket.getPackage().then((pkg) => {
      setNextPkg(pkg);
    });

    return () => {
      socket.disconnect();
    }
  })

  return (
    <div>
      <div></div>
      <div></div>
    </div>
  )
}

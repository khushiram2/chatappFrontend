import { io } from "socket.io-client";
import { Api } from "../GlobalApi";

export const socket=io(Api)

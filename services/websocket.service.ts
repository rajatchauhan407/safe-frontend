import io,{Socket} from 'socket.io-client';
import { BACKEND_BASE_URL, BACKEND_ORIGIN } from '../config/api';

class WebSocketService{
    private socket: Socket;
    constructor(){
        this.socket = io(BACKEND_ORIGIN,{autoConnect: false});

        this.socket.on('connect',()=>{
            console.log("connected to websocket server");
        });

        this.socket.on('disconnect',()=>{
            console.log("disconnected from websocket server");
        });
    }

    connect(){
        this.socket.connect();
    }

    disconnect(){
        this.socket.disconnect();
    }
}

export default new WebSocketService();
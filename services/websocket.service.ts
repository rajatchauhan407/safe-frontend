import io,{Socket} from 'socket.io-client';
import { BACKEND_BASE_URL, BACKEND_ORIGIN, LOCAL_BASE_URL,BACKEND_ORIGIN_LOCAL} from '../config/api';

class WebSocketService{
    private socket: Socket;
    constructor(){
        this.socket = io(BACKEND_ORIGIN);

        this.socket.on('connect',()=>{
            console.log("connected to websocket server");
        });

        this.socket.on('disconnect',()=>{
            console.log("disconnected from websocket server");
        });
        this.socket.on('error', (error) => {
            console.error("WebSocket Error:", error);
        });
        

    }

    

    connect(){
        console.log("connecting to websocket server from connect method ");
        this.socket.connect();
    }

    disconnect(){
        this.socket.disconnect();
    }

    // Subscribe to a specific event
    subscribeToEvent(eventName: string, callback: (data: any) => void) {
        this.socket.on(eventName, callback);
    }

    // Unsubscribe from a specific event
    unsubscribeFromEvent(eventName: string) {
        this.socket.off(eventName);
    }
}

export default new WebSocketService();
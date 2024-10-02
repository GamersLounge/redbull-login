// src/utils/Socket.js
import { io } from 'socket.io-client';
import { reactive } from 'vue';

export const message = reactive({ value: null }); // Make message reactive

class Socket {
    constructor() {
        this.socket = null;
    }

    connect(url, accessToken, refreshToken) {
        this.socket = io.connect(url, {
            query: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            },
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            console.log('Socket manually disconnected');
        }
    }

    listenToScoreChange() {
        if (this.socket) {
            this.socket.on("Score:userUpdate", (msg) => {
                message.value = msg;
                console.log(message.value);
            });
        }
    }

    listenToQueueCall() {
        if (this.socket) {
            this.socket.on("UserIsCalled:update", (msg) => {
                message.value = msg;
                console.log(message.value);
            });
        }
    }

    listenToQueueEnter() {
        if (this.socket) {
            this.socket.on("UserEnter:update", (msg) => {
                message.value = msg;
                console.log(message.value);
            });
        }
    }

    // getMesaage() {
    //     return this.message;
    // }
}

export default Socket;

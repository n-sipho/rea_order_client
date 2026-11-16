import { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { BACKEND_URL } from '../utils/api';

const socket = socketIOClient(BACKEND_URL);
class SocketConnection extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: "http://localhost:5000",
        }
        // socket = socketIOClient(this.state.endpoint);
    }

    render() {
        return null;
    }
}

export { SocketConnection, socket };
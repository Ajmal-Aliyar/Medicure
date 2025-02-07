import io from 'socket.io-client';
import store from '../store/store';
import { setCanditates, setRoomId } from '../store/slices/commonSlices/videoConsultSlice';
import { ICandidate } from '../store/slices/commonSlices/videoConsultSlice'
import { handleSignalData, prepareNewPeerConnection } from './webrtc';

const SERVER: string = 'http://localhost:3000';
let socket: any = null;

export const connectWithSocketIOServer = () => {
    socket = io(SERVER);

    socket.on('connect', () => {
        console.log('User connected with socket, ID:',socket.id)
    })

    socket.on('room-id', ({roomId}:{roomId: string}) => {
        store.dispatch(setRoomId(roomId))
    })

    socket.on('update-room', (canditates: {candidates: ICandidate[]}) => {
        store.dispatch(setCanditates(canditates))
    })

    socket.on('conn-prepare', ({socketId}:{socketId: string}) => {
        prepareNewPeerConnection(socketId, false)
        socket.emit('conn-init', { socketId })
    })

    socket.on('conn-init', ({socketId}: {socketId: string}) => {
        prepareNewPeerConnection(socketId, true)
    })

    socket.on('conn-signal', (data: {socketId: string, signal: any}) => {
        handleSignalData(data)
    })
}

export const createNewRoom = (candidateId: string) => {
    if (!socket) {
        console.error('Socket not initialized. Cannot create room.');
        return;
    }
    socket.emit('create-new-room', { candidateId });
};

export const joinRoom = (candidateId: string, roomId: string) => {
    if (!socket) {
        alert('socket missing')
        return
    }
    console.log(candidateId, roomId, 'c+r, ids')
    socket.emit('join-room', {candidateId, roomId})
}

export const signalPeerData = (data: {signal:any, socketId: string}) => {
    if (!socket) {
        alert('socket missing')
        return
    }
    console.log('problem ficese')
    socket.emit('conn-signal',data)
}
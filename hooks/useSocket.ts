import {useCallback} from 'react';
import SocketIOClient, {Socket} from 'socket.io-client';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {initialStateProps} from '../store/slice';

let socket: Socket | undefined;
const useSocket = (): [Socket | undefined, () => void] => {
  const isLoggedIn = useSelector(
    (state: initialStateProps) => !!state.isLoggedIn,
  );
  const disconnect = useCallback(() => {
    if (socket && !isLoggedIn) {
      console.log(socket && !isLoggedIn, '웹소켓 연결을 해제합니다.');
      socket.disconnect();
      socket = undefined;
    }
  }, [isLoggedIn]);
  if (!socket && isLoggedIn) {
    console.log(!socket && isLoggedIn, '웹소켓 연결을 진행합니다.');
    console.log(Config.API_URL);
    socket = SocketIOClient('http://192.168.123.103:3000', {
      transports: ['websocket'],
    });
  }
  return [socket, disconnect];
};

export default useSocket;

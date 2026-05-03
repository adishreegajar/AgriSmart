import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Access global 'io' from the window object (loaded via script tag in index.html)
    const io = window.io;
    
    if (user && io) {
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);

      return () => newSocket.close();
    } else {
      setSocket(null);
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

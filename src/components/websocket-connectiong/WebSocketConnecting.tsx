import { useWebSocket } from "../../websocket";
import "./WebSocketConnection.css";

const WebSocketConnecting = () => {
  const { status } = useWebSocket();

  return (
    <div className="websocket">
      <p className="status">rpi</p>
      <p>{status}</p>
    </div>
  );
};
export default WebSocketConnecting;

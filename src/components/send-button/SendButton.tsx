import { useWebSocket } from "../../websocket.ts";
import { useController } from "../../hooks/useController.ts";
import type { Commands } from "../../commandsType.ts";
import "./SendButton.css";

const SendButton = () => {
  const { targetPosition, show, setShow, theta } = useController();
  const { sendMessage } = useWebSocket.getState();

  const handleSendClick = () => {
    if (show) {
      const sendData: Commands = {
        command: "set_location",
        x: targetPosition.x,
        y: targetPosition.y,
        degree: theta,
      };
      sendMessage(sendData);
    }
    setShow(false);
  };

  return (
    <div>
      <button className="send-button" onClick={handleSendClick}>
        send
      </button>
    </div>
  );
};
export default SendButton;

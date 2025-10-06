import { useWebSocket } from "../../websocket.ts";
import { useController } from "../../hooks/useController.ts";
import "./SendButton.css";

const SendButton = () => {
	const { targetPosition, show, setShow } = useController();
	const { sendMessage } = useWebSocket();

	const handleSendClick= () => {
		if(show)	{sendMessage(targetPosition);}
		setShow(false);
	}

	return (
		<div>
			<button className="send-button" onClick={handleSendClick}>send</button>
			<button className="cancel-button"  onClick={() => (setShow(false))}>cancel</button>
		</div>
	);
};
export default SendButton;

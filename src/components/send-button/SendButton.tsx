import { useWebSocket } from "../../websocket.ts";
import { useController } from "../../hooks/useController.ts";
import type { Commands } from "../../commandsType.ts";
import { setting } from "../../controller.ts";
import "./SendButton.css";

const SendButton = () => {
	const { targetPositionScale, show, setShow, theta } = useController();
	const { sendMessage } = useWebSocket.getState();

	const handleSendClick = () => {
		if (show) {
			const sendData: Commands = {
				command: "set_location",
				x: targetPositionScale.x * setting.fieldSize.width,
				y: targetPositionScale.y * setting.fieldSize.height,
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

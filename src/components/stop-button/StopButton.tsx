import { useWebSocket } from "../../websocket.ts";

const { sendMessage } = useWebSocket.getState();

const AllStopButton = () => {
	return (
		<button onClick={() => sendMessage({ command: "emergency_stop" })}>緊急停止</button>
	);
};
export default AllStopButton;

// export const ArmStopButton = () => {
// 	return (<button onClick={()=> sendMessage({command: "arm_stop"})}>Arm Stop</button>);
// };

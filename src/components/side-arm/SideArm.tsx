import { useWebSocket } from "../../websocket.ts";
import { Button } from "../Button/Button.tsx";

const { sendMessage } = useWebSocket.getState();

const RightSideArmOpen = () => {
	return <Button onClick={() => sendMessage({ command: "" })}>展開 右</Button>;
};
const LeftSideArmOpen = () => {
	return <Button onClick={() => sendMessage({ command: "" })}>展開 左</Button>;
};
const RightSideArmClose = () => {
	return <Button onClick={() => sendMessage({ command: "" })}>収納 右</Button>;
};
const LeftSideArmClose = () => {
	return <Button onClick={() => sendMessage({ command: "" })}>収納 左</Button>;
};

const SideArm = () => {
	return (
		<div>
			<h3>サイドアーム</h3>
			<LeftSideArmOpen />
			<RightSideArmOpen />
			<LeftSideArmClose />
			<RightSideArmClose />
		</div>
	);
};
export default SideArm;

import { useWebSocket } from "../../websocket.ts";
import { Button } from "../Button/Button.tsx";

const { sendMessage } = useWebSocket.getState();

const StartButton = () => {
	return <Button onClick={() => SendMessage({ command: "" })}>スタート</Button>;
};
const PylonCompletion = () => {
	return (
		<Button onClick={() => SendMessage({ command: "" })}>パイロン完了</Button>
	);
};
const HangCeilingButton = () => {
	return (
		<Button onClick={() => sendMessage({ command: "" })}>天井セット</Button>
	);
};
const EndFrontArm = () => {
	return (
		<Button onClick={() => SendMessage({ command: "" })}>
			フロントアーム終わり
		</Button>
	);
};
const BoxMountCompletion = () => {
	return (
		<Button onClick={() => sendMessage({ command: "" })}>ボックス設置完了</Button>
	);
};

const Preset = () => {
	return (
		<div>
			<StartButton />
			<PylonCompletion />
			<HangCeilingButton />
			<EndFrontArm />
			<BoxMountCompletion />
		</div>
	);
};

export default Preset;

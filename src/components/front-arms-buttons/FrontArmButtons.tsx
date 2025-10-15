import { useWebSocket } from "../../websocket.ts";
import { Button } from "../Button/Button";

const { sendMessage } = useWebSocket.getState();

const CollectModeButton = () => {
	return (
		<Button onClick={() => sendMessage({ command: "" })}>回収モード</Button>
	);
};
const HangCeilingButton = () => {
	return (
		<Button onClick={() => sendMessage({ command: "" })}>天井セット</Button>
	);
};
const FoldButton = () => {
	return (
		<Button onClick={() => sendMessage({ command: "" })}>収納　前</Button>
	);
};
const RightSuctionOnButton = () => {
	return (
		<Button onClick={() => sendMessage({command: ""})}>吸引On 右</Button>
	);
};
const RighSuctiontOffButton = () => {
	return (
		<Button onClick={() => sendMessage({command: ""})}>吸引Off 右</Button>
	);
}
const LeftSuctionOnButton = () => {
	return (
		<Button onClick={() => sendMessage({command: ""})}>吸引On 左</Button>
	);
};
const LeftSuncitonOffButton = () => {
	return (
		<Button onClick={() => sendMessage({command: ""})}>吸引Off 左</Button>
	);
}

const FrontArmButtons = () => {
	return (
		<div>
			<h3>フロントアーム</h3>
			<CollectModeButton />
			<HangCeilingButton />
			<FoldButton />
			<RightSuctionOnButton />
			<RighSuctiontOffButton />
			<LeftSuctionOnButton />
			<LeftSuncitonOffButton />
		</div>
	);
};

export default FrontArmButtons;

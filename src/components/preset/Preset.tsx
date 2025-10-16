import { VStack, Box } from "@chakra-ui/react";
import { useWebSocket } from "../../websocket.ts";
import { Button } from "../Button/Button.tsx";
import "./Preset.css";

const { sendMessage } = useWebSocket.getState();

const StartButton = () => {
	return (
		<Button
			className="Preset"
			onClick={() => {
				sendMessage({ command: "all_arm_start" });
				sendMessage({ command: "all_side_arm_open" });
			}}
		>
			スタート
		</Button>
	);
};
const PylonCompletion = () => {
	return (
		<Button
			className="Preset"
			onClick={() => {
				sendMessage({ command: "arm_collect_mode" });
				sendMessage({ command: "all_side_arm_fold" });
			}}
		>
			パイロン完了
		</Button>
	);
};
const HangCeilingButton = () => {
	return (
		<Button
			className="Preset"
			onClick={() => sendMessage({ command: "arm_ceiling_deploy" })}
		>
			天井セット
		</Button>
	);
};
const EndFrontArm = () => {
	return (
		<Button
			className="Preset"
			onClick={() => sendMessage({ command: "all_arm_fold_lower" })}
		>
			フロントアーム終わり
		</Button>
	);
};
const BoxMountCompletion = () => {
	return (
		<Button
			className="Preset"
			onClick={() => {
				sendMessage({ command: "side_arm_open_max" });
				setTimeout(() => {
					sendMessage({ command: "all_side_arm_fold" });
				}, 1000);
			}}
		>
			ボックス設置完了
		</Button>
	);
};

const Preset = () => {
	return (
		<div>
			<VStack p={5}>
				<h2>プリセット</h2>
				<Box p={5}>
					<StartButton />
				</Box>
				<Box p={5}>
					<PylonCompletion />
				</Box>
				<Box p={5}>
					<HangCeilingButton />
				</Box>
				<Box p={5}>
					<EndFrontArm />
				</Box>
				<Box p={5}>
					<BoxMountCompletion />
				</Box>
			</VStack>
		</div>
	);
};

export default Preset;

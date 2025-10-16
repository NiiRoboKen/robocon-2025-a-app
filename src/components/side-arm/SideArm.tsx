import { HStack, VStack } from "@chakra-ui/react";
import { useWebSocket } from "../../websocket.ts";
import { Button } from "../Button/Button.tsx";
import "./SideArm.css";

const { sendMessage } = useWebSocket.getState();

const RightSideArmOpen = () => {
	return (
		<Button
			className="SideArm"
			onClick={() => sendMessage({ command: "right_side_arm_open" })}
		>
			展開 右
		</Button>
	);
};
const LeftSideArmOpen = () => {
	return (
		<Button
			className="SideArm"
			onClick={() => sendMessage({ command: "left_side_arm_open" })}
		>
			展開 左
		</Button>
	);
};

const RightSideArmClose = () => {
	return (
		<Button
			className="SideArm"
			onClick={() => sendMessage({ command: "right_side_arm_fold" })}
		>
			収納 右
		</Button>
	);
};
const LeftSideArmClose = () => {
	return (
		<Button
			className="SideArm"
			onClick={() => sendMessage({ command: "left_side_arm_fold" })}
		>
			収納 左
		</Button>
	);
};
const AllArmClose = () => {
	return (
		<Button
			className="AllClose"
			onClick={() => {
				sendMessage({ command: "all_side_arm_fold" });
				sendMessage({ command: "all_arm_fold_lower" });
			}}
		>
			全収納
		</Button>
	);
};

const SideArm = () => {
	return (
		<div>
			<VStack p={5}>
				<h3>サイドアーム</h3>

				<HStack>
					<LeftSideArmOpen />
					<RightSideArmOpen />
				</HStack>
				<HStack>
					<LeftSideArmClose />
					<RightSideArmClose />
				</HStack>
				<AllArmClose />
			</VStack>
		</div>
	);
};
export default SideArm;

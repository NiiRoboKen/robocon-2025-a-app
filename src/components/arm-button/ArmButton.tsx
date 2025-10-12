import { Button } from "../Button/Button.tsx";
import { useWebSocket } from "../../websocket.ts";
import type { BoxSize } from "../../controller.ts";

const ArmButton = () => {
	const boxList: BoxSize[] = ["A", "B", "C", "D", "E"];
	const { sendMessage } = useWebSocket();

	const handleLeftClick = (BoxType: BoxSize) => {
		sendMessage({ command: "left_arm_move", box: BoxType });
	};
	const handleRightClick = (BoxType: BoxSize) => {
		sendMessage({ command: "right_arm_move", box: BoxType });
	};

	const BoxButtons = boxList.map((n) => {
		return (
			<div>
			<Button key={n} onClick={() => handleLeftClick(n)}>
			Box {n}
			</Button>
				<Button key={n} onClick={() => handleRightClick(n)}>
					Box {n}
				</Button>
			</div>
		);
	});
	return (<div>{BoxButtons}</div>);
};
export default ArmButton;

import { useRef, useState } from "react";
import { Stage, Layer, Rect, Line, Circle, Arc , Arrow} from "react-konva";
import { setting } from "../../controller";
import { useController } from "../../hooks/useController";
import { useWebSocket } from "../../websocket";

const Konva = () => {
	const { targetPosition, setTargetPosition, show, setShow } = useController();
	const { realtimePosition } = useWebSocket();
	const [line, setLine] = useState<number[]>();
	const stageRef = useRef(null);

	const handleTouchStart = () => {
		const touchPosition = stageRef.current?.getPointerPosition();
		if (!touchPosition) return;

		setTargetPosition({
			x: Math.round(
				Math.max(Math.min(touchPosition.x, setting.fieldSize.x), 0),
			),
			y: Math.round(
				Math.max(Math.min(touchPosition.y, setting.fieldSize.y), 0),
			),
			theta: realtimePosition.theta,
		});
		setShow(true);
		setLine([
			touchPosition.x,
			touchPosition.y,
			touchPosition.x + 60 * Math.cos(targetPosition.theta * Math.PI / 180),
			touchPosition.y + 60 * Math.sin(targetPosition.theta * Math.PI / 180),
		]);
	};

	const handleTouchMove = () => {
		const touchMovePosition = stageRef.current?.getPointerPosition();
		if (!touchMovePosition) return;

		const xValue = touchMovePosition.x - targetPosition.x;
		const yValue = touchMovePosition.y - targetPosition.y;
		//
		const theta = Math.atan2(yValue, xValue) * (180 / Math.PI);
		setTargetPosition({ ...targetPosition, theta: Math.round(theta) });
		const tempArray = line?.slice(0, 2);
		tempArray.push(touchMovePosition.x, touchMovePosition.y);
		setLine(tempArray);

		// line.current=[...tempArray, touchMovePosition.x, touchMovePosition.y];
	};

	return (
		<Stage
			width={setting.fieldSize.x}
			height={setting.fieldSize.y}
			ref={stageRef}
		>
			<Layer>
				<Line
					points={[
						0,
						0,
						setting.fieldSize.x,
						0,
						setting.fieldSize.x,
						setting.fieldSize.y,
						0,
						setting.fieldSize.y,
						0,
						0,
					]}
					stroke="black"
				/>

				<Rect //touch field
					x={0}
					y={0}
					width={setting.fieldSize.x}
					height={setting.fieldSize.y}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
				/>

				<Rect //realtime robot
					x={realtimePosition.x}
					y={realtimePosition.y}
					rotation={realtimePosition.theta}
					opacity={0.3}
					shadowEnabled={false}
					width={100}
					height={100}
					fill="red"
					shadowBlur={10}
					strokeWidth={5}
					stroke={"Black"}
				/>
				<Circle
					radius={20}
					x={targetPosition.x}
					y={targetPosition.y}
					fill="Red"
					fillEnabled={show}
				/>
				<Arrow points={line} stroke="Green" strokeEnabled={show} />
				<Arc
					x={targetPosition.x}
					y={targetPosition.y}
					angle={targetPosition.theta}
					innerRadius={25}
					outerRadius={30}
					fill="Blue"
					fillEnabled={show}
				/>
			</Layer>
		</Stage>
	);
};

export default Konva;

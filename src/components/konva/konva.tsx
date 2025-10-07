import { useRef, useState } from "react";
import { Stage, Layer, Rect, Line, Circle, Arc, Arrow } from "react-konva";
import { setting, modeThema } from "../../controller";
import { useController, useModeStore } from "../../hooks/useController";
import { useWebSocket } from "../../websocket";

const Konva = () => {
	const { targetPosition, setTargetPosition, show, setShow } = useController();
	const { realtimePosition } = useWebSocket();
	const [line, setLine] = useState<number[]>();
	const { mode } = useModeStore();
	const colorTheme = modeThema[mode];
	const stageRef = useRef(null);

	const handleTouchStart = () => {
		const touchPosition = stageRef.current?.getPointerPosition();
		if (!touchPosition) return;

		setTargetPosition({
			x: Math.round(
				Math.max(Math.min(touchPosition.x, setting.fieldSize.width), 0),
			),
			y: Math.round(
				Math.max(Math.min(touchPosition.y, setting.fieldSize.height), 0),
			),
			theta: realtimePosition.theta,
		});
		setShow(true);
		setLine([
			touchPosition.x,
			touchPosition.y,
			touchPosition.x + 60 * Math.cos((targetPosition.theta * Math.PI) / 180),
			touchPosition.y + 60 * Math.sin((targetPosition.theta * Math.PI) / 180),
		]);
	};

	const handleTouchMove = () => {
		const touchMovePosition = stageRef.current?.getPointerPosition();
		if (!touchMovePosition) return;

		const xValue = touchMovePosition.x - targetPosition.x;
		const yValue = touchMovePosition.y - targetPosition.y;

		const theta = Math.atan2(yValue, xValue) * (180 / Math.PI);
		setTargetPosition({ ...targetPosition, theta: Math.round(theta) });
		const tempArray = line?.slice(0, 2);
		tempArray.push(touchMovePosition.x, touchMovePosition.y);
		setLine(tempArray);
	};

	return (
		<Stage
			width={setting.fieldSize.width}
			height={setting.fieldSize.height}
			ref={stageRef}
		>
			<Layer>
				<Rect //background
					x={0}
					y={0}
					width={setting.fieldSize.width}
					height={setting.fieldSize.height}
					fill={colorTheme.colors.backGround}
				/>
				<Rect // share box area
					x={colorTheme.shareBoxAreaPosition.x}
					y={colorTheme.shareBoxAreaPosition.y}
					width={setting.shareBoxArea.width}
					height={setting.shareBoxArea.height}
					fill="white"
				/>
				<Rect // own box area
					x={colorTheme.ownBoxAreaPosition.x}
					y={colorTheme.ownBoxAreaPosition.y}
					width={setting.ownBoxArea.width}
					height={setting.ownBoxArea.height}
					fill={colorTheme.colors.other}
				/>
				<Rect // working area
					x={setting.workingArea.x}
					y={setting.workingArea.y}
					width={setting.workingArea.width}
					height={setting.workingArea.height}
					fill={colorTheme.colors.workingArea}
				/>
				<Rect // gate area
					x={setting.gateArea.x}
					y={setting.gateArea.y}
					width={setting.gateArea.width}
					height={setting.gateArea.height}
					fill={colorTheme.colors.other}
				/>
				<Rect // foot	spot
					x={colorTheme.footSpotPosition.x}
					y={colorTheme.footSpotPosition.y}
					height={setting.footSpot.height}
					width={setting.footSpot.width}
					fill={colorTheme.colors.backGround}
				/>
				<Rect // start zone
					width={setting.startZone.width}
					height={setting.startZone.height}
					x={colorTheme.startZonePosition.x}
					y={colorTheme.startZonePosition.y}
					fill={colorTheme.colors.other}
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

				<Rect //touch field
					x={0}
					y={0}
					width={setting.fieldSize.width}
					height={setting.fieldSize.height}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
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

				<Line
					points={[
						0,
						0,
						setting.fieldSize.width,
						0,
						setting.fieldSize.width,
						setting.fieldSize.height,
						0,
						setting.fieldSize.height,
						0,
						0,
					]}
					stroke="black"
					strokeWidth={5}
				/>
			</Layer>
		</Stage>
	);
};

export default Konva;

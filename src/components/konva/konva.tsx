import { useRef, useState } from "react";
import {
	Stage,
	Layer,
	Rect,
	Line,
	Circle,
	Arc,
	Arrow,
	Image,
} from "react-konva";
import { setting, ModeTheme } from "../../controller";
import { useController, useModeStore } from "../../hooks/useController";
import { useWebSocket } from "../../websocket";
import useImage from "use-image";

const Konva = () => {
	const { targetPosition, setTargetPosition, show, setShow } = useController();
	const { realtimePosition } = useWebSocket();
	const [line, setLine] = useState<number[]>();
	const { mode } = useModeStore();
	const colorTheme = ModeTheme[mode];
	const [fielddImage] = useImage(colorTheme.fieldImageSrc);
	const stageRef = useRef(null);

	// const defaultStartPosition: Position = colorTheme.defaultPosition;

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
				<Image
					image={fielddImage}
					x={0}
					y={0}
					width={setting.fieldSize.width}
					height={setting.fieldSize.height}
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
					draggable
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
					stroke={colorTheme.colors.other}
					strokeWidth={5}
				/>
			</Layer>
		</Stage>
	);
};

export default Konva;

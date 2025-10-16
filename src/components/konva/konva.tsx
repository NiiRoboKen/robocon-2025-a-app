import Konva from "konva"
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

const SetLocation = () => {
	const {
		targetPosition,
		setTargetPosition,
		setTargetPositionScale,
		theta,
		setTheta,
		show,
		setShow,
	} = useController();
	const { realtimeStatus } = useWebSocket();
	const [line, setLine] = useState<number[]>([0, 0, 0, 0]);
	const { mode } = useModeStore();
	const colorTheme = ModeTheme[mode];
	const [fieldImage] = useImage(colorTheme.fieldImageSrc);
	const stageRef = useRef<Konva.Stage | null>(null);

	// const defaultStartPosition: Position = colorTheme.defaultPosition;

	const handleTouchStart = () => {
		const touchPosition = stageRef.current?.getPointerPosition();
		if (!touchPosition) return;
		setTargetPositionScale({ x: touchPosition.x, y: touchPosition.y });
		setTargetPosition({ x: touchPosition.x, y: touchPosition.y });

		setShow(true);
		setLine([
			touchPosition.x,
			touchPosition.y,
			touchPosition.x + (60 * Math.cos(theta * Math.PI)) / 180,
			touchPosition.y + (60 * Math.sin(theta * Math.PI)) / 180,
		]);
	};

	const handleTouchMove = () => {
		const touchMovePosition = stageRef.current?.getPointerPosition();
		if (!touchMovePosition) return;

		const xValue = touchMovePosition.x - targetPosition.x;
		const yValue = touchMovePosition.y - targetPosition.y;

		const thetaValue = Math.atan2(yValue, xValue) * (180 / Math.PI);
		setTheta(thetaValue);
		const tempArray = line?.slice(0, 2);
		tempArray.push(touchMovePosition.x, touchMovePosition.y);
		setLine(tempArray);
	};

	return (
		<Stage
			width={setting.fieldSizeScale.width}
			height={setting.fieldSizeScale.height}
			ref={stageRef}
		>
			<Layer>
				<Image
					image={fieldImage}
					x={0}
					y={0}
					width={setting.fieldSizeScale.width}
					height={setting.fieldSizeScale.height}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
				/>

				<Rect //realtime robot
					x={realtimeStatus.x * setting.fieldSizeScale.width}
					y={realtimeStatus.y * setting.fieldSizeScale.height}
					rotation={realtimeStatus.theta}
					opacity={0.3}
					shadowEnabled={false}
					width={setting.robotSizeScale.width}
					height={setting.robotSizeScale.height}
					fill={colorTheme.colors.robotColor}
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
					angle={theta}
					innerRadius={25}
					outerRadius={30}
					fill="Blue"
					fillEnabled={show}
				/>

				<Line
					points={[
						0,
						0,
						setting.fieldSizeScale.width,
						0,
						setting.fieldSizeScale.width,
						setting.fieldSizeScale.height,
						0,
						setting.fieldSizeScale.height,
						0,
						0,
					]}
					stroke={colorTheme.colors.other}
					strokeWidth={10}
				/>
			</Layer>
		</Stage>
	);
};

export default SetLocation;

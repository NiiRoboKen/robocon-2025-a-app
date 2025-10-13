import { useController } from "../../hooks/useController";
import { useWebSocket } from "../../websocket";
import "./Information.css";

const Information = () => {
	const { targetPositionScale, theta } = useController();
	const { status, realtimeStatus} = useWebSocket();
	// const targetPosition = useController((state) => state.targetPosition);

	return (
		<div>
			<h1>{status}</h1>
			<div className="info">
				<div className="box">
					<h2>Target Position</h2>
					<p>x: {targetPositionScale.x}</p>
					<p>y: {targetPositionScale.y}</p>
					<p> theta: {theta} </p>
				</div>

				<div className="box">
					<h2>Real Time Position</h2>
					<p>x: {realtimeStatus.x}</p>
					<p>y: {realtimeStatus.y}</p>
					<p>theta: {realtimeStatus.theta}</p>
				</div>
			</div>
		</div>
	);
};

export default Information;

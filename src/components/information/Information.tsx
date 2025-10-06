import { useController } from "../../hooks/useController";
import { useWebSocket } from "../../websocket";
import "./Information.css";

const Information = () => {
	const { targetPosition } = useController();
	const { status, realtimePosition } = useWebSocket();
	// const targetPosition = useController((state) => state.targetPosition);

	return (
		<div>
			<h1>{status}</h1>
			<div className="info">
				<div className="box">
					<h2>Target Position</h2>
					<p>x: {targetPosition.x}</p>
					<p>y: {targetPosition.y}</p>
					<p> theta: {targetPosition.theta} </p>
				</div>

				<div className="box">
					<h2>Real Time Position</h2>
					<p>x: {realtimePosition.x}</p>
					<p>y: {realtimePosition.y}</p>
					<p>theta: {realtimePosition.theta}</p>
				</div>
			</div>
		</div>
	);
};

export default Information;

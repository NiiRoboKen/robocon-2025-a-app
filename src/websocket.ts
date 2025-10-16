import { create } from "zustand";
import ReconnectingWebSocket from "reconnecting-websocket";
import type { Status } from "./controller.ts";
import { setting } from "./controller.ts";
import type { Commands } from "./commandsType.ts";
// import { useModeStore } from "./hooks/useController";

interface WebSocketState {
	realtimeStatus: Status;
	espConnecting: boolean;
	status: "ERROR" | "CONNECTTING" | "CLOSE";
	socket: ReconnectingWebSocket | null;
	sendMessage: (data: Commands) => void;
	connect: () => void;
	disconnect: () => void;
}

export const useWebSocket = create<WebSocketState>((set, get) => ({
	socket: null,
	espConnecting: false,
	realtimeStatus: {
		x:
			setting.fieldSizeScale.width *
			(setting.defaultRobotPosition.x / setting.fieldSize.width),
		y:
			setting.fieldSizeScale.height *
			(setting.defaultRobotPosition.y / setting.fieldSize.height),
		theta: setting.defaultRobotPosition.theta,
	},
	status: "CLOSE",

	connect: () => {
		if (get().socket) return;

		const socket = new ReconnectingWebSocket("ws://localhost:3000/ws");

		socket.onopen = () => {
			console.log("WebSocket connected");
			set({ socket });
			set({ status: "CONNECTTING" });
		};

		socket.onclose = () => {
			console.log("WebSocket disconnected");
			set({ socket: null });
			set({ status: "CLOSE" });
		};

		socket.onerror = () => {
			// console.error("WebSocket error:", err);
			set({ status: "ERROR" });
		};

		socket.onmessage = (event) => {
			console.log("Received:", event.data);
			try {
				const receivedData: Commands = JSON.parse(event.data); // ← ここがポイント！
				console.log("Received:", receivedData);

				switch (receivedData.command) {
					case "set_location":
						set({
							realtimeStatus: {
								x: (100 * receivedData.x) / setting.fieldSize.width,
								y: (100 * receivedData.y) / setting.fieldSize.width,
								theta: receivedData.degree,
							},
						});
						break;
					case "receive_failed": {
						set({ espConnecting: false });
						break;
					}
					case "receive_success": {
						set({ espConnecting: true });
					}
				}
			} finally {
				console.log("json parse error", event.data);
			}
			// catch (error: unknown) {
			// 	console.log("Invalid JSON received:"+ event.data +error.name);
			// }
		};
	},

	disconnect: () => {
		const socket = get().socket;
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.close();
			set({ socket: null });
		}
	},

	sendMessage: (data: Commands) => {
		const socket = get().socket;
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify(data));
		} else {
			console.warn("WebSocket not connected, cannot send:", data);
		}
	},
}));

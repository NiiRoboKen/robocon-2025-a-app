import { create } from "zustand";
import ReconnectingWebSocket from "reconnecting-websocket";
import type { Status } from "./controller.ts";
import { setting } from "./controller.ts";
import type { Commands } from "./commandsType.ts";

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

		const socket = new ReconnectingWebSocket("ws://192.168.11.10:3000/");

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
			// console.log("Received:", event.data);
			try {
				const receivedData = JSON.parse(event.data) as Commands;
				console.log("Received:", receivedData);

				switch (receivedData.command) {
					case "set_location":
						set({
							realtimeStatus: {
								x: receivedData.x / setting.fieldSize.width,
								y: receivedData.y / setting.fieldSize.width,
								theta: receivedData.degree,
							},
						});
						break;
					case "connection_failed": {
						set({ espConnecting: false });
						break;
					}
					case "connection_success": {
						set({ espConnecting: true });
						break;
					}
					default:
						console.log("Unknows command", receivedData.command);
						break;
				}
			} catch (error) {
				if (error instanceof Error) {
					console.log("Invalid JSON received:", event.data, error.name);
				} else {
					console.log("Invalid JSON received:", event.data, error);
				}
			} finally {
				console.log("json parse error");
			}
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
			console.log(data);
		} else {
			console.warn("WebSocket not connected, cannot send:", data);
		}
	},
}));

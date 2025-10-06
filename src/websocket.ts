import { create } from "zustand";
import ReconnectingWebSocket from "reconnecting-websocket";
import {type Position, setting } from "./controller";

interface WebSocketState {
	realtimePosition: Position;
	status: "ERROR" | "CONNECTTING" | "CLOSE";
	socket: ReconnectingWebSocket | null;
	sendMessage: (data: Position) => void;
	connect: () => void;
	disconnect: () => void;
}

export const useWebSocket = create<WebSocketState>((set, get) => ({
	socket: null,
	realtimePosition: setting.defaultRobotPosition,
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

		socket.onerror = (err) => {
			console.error("WebSocket error:", err);
			set({ status: "ERROR" });
		};

		socket.onmessage = (event) => {
			console.log("Received:", event.data);
			try {
				const data = JSON.parse(event.data); // ← ここがポイント！
				console.log("Received:", data);

				// data が Position の形をしていると仮定
				set({ realtimePosition: data });
			} catch (error) {
				console.error("Invalid JSON received:", event.data);
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

	sendMessage: (data: Position) => {
		const socket = get().socket;
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify(data));
		} else {
			console.warn("WebSocket not connected, cannot send:", data);
		}
	},
}));

import { type Position, setting } from "../controller";
import { create } from "zustand";

interface TargetPositionStoreType {
	targetPosition: Position;
	setTargetPosition?: (positionInfomation : Position) => void;
	show: boolean;
	setShow?: (showJudge: boolean) => void;
}
// interface RealtimePositionStoreType {
// 	realtimePosition: Position;
// 	setRealtimePosition?: (positionInfomation: Position) => void;
// }

export const useController = create<TargetPositionStoreType>((set) => ({
	targetPosition: setting.defaultRobotPosition,
	setTargetPosition: (positionInfomation: Position) =>
		set({ targetPosition: positionInfomation}),
	show: false,
	setShow: (showJudge: boolean) => set({show: showJudge})
}));

// export const useMonitor = create<RealtimePositionStoreType>((set) => ({
// 	realtimePosition: setting.defaultRobotPosition,
// 	setRealtimePosition: (positionInfomation: Position) =>
// 		set({ realtimePosition: positionInfomation })
// }))

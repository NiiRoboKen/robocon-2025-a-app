import { setting } from "../controller";
import type { Status, Position } from "../controller";
import { create } from "zustand";

interface TargetPositionStoreType {
	targetPosition: Position;
	setTargetPosition: (positionInfomation: Position) => void;
	targetPositionScale: Position;
	setTargetPositionScale: (positionInfomation: Position) => void;
	theta: number;
	setTheta: (thetaValue: number) => void;
	emptyTargetPosition: boolean;
	setEmptyTargetPosition: (emptyJudge: boolean) => void;
	show: boolean;
	setShow: (showJudge: boolean) => void;
}

export const useController = create<TargetPositionStoreType>((set) => ({
	targetPosition: {
		x: setting.defaultRobotPosition.x,
		y: setting.defaultRobotPosition.y,
	},
	setTargetPosition: (positionInfomation: Position) =>
		set({ targetPosition: positionInfomation }),
	targetPositionScale: {
		x: setting.defaultRobotPosition.x / setting.fieldSize.width,
		y: setting.defaultRobotPosition.y / setting.fieldSize.width,
	},
	setTargetPositionScale: (positionInfomation: Position) => {
		set({
			targetPositionScale: {
				x: (100 * positionInfomation.x) / setting.fieldSizeScale.width,
				y: (100 * positionInfomation.y) / setting.fieldSizeScale.height,
			},
		});
	},
	theta: setting.defaultRobotPosition.theta,
	setTheta: (thetaValue: number) => {
		set({ theta: thetaValue });
	},
	emptyTargetPosition: false,
	setEmptyTargetPosition: (emptyJudge: boolean) => {
		set({ emptyTargetPosition: emptyJudge });
	},
	show: false,
	setShow: (showJudge: boolean) => set({ show: showJudge }),
}));

type ColorMode = "blue" | "red";

interface ModeState {
	mode: ColorMode;
	toggleMode: () => void;
}

export const useModeStore = create<ModeState>((set) => ({
	mode: "blue",
	toggleMode: () => set((s) => ({ mode: s.mode === "blue" ? "red" : "blue" })),
}));

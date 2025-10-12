import { type Position, setting } from "../controller";
import { create } from "zustand";

interface TargetPositionStoreType {
	targetPosition: Position;
	setTargetPosition: (positionInfomation: Position) => void;
	emptyTargetPosition: boolean;
	setEmptyTargetPosition: (emptyJudge: boolean) => void;
	show: boolean;
	setShow: (showJudge: boolean) => void;
}

export const useController = create<TargetPositionStoreType>((set) => ({
	targetPosition: setting.defaultRobotPosition,
	setTargetPosition: (positionInfomation: Position) =>
		set({ targetPosition: positionInfomation }),
	emptyTargetPosition: false,
	setEmptyTargetPosition: (emptyJudge: boolean) =>
		set({ emptyTargetPosition: emptyJudge }),
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

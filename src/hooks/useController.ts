import { type Position, setting} from "../controller";
import { create } from "zustand";

interface TargetPositionStoreType {
	targetPosition: Position | null;
	setTargetPosition?: (positionInfomation : Position) => void;
	show: boolean;
	setShow?: (showJudge: boolean) => void;
}

export const useController = create<TargetPositionStoreType>((set) => ({
	targetPosition: setting.defaultRobotPosition,
	setTargetPosition: (positionInfomation: Position) =>
		set({ targetPosition: positionInfomation}),
	show: false,
	setShow: (showJudge: boolean) => set({show: showJudge})
}));

type ColorMode = "blue" | "red";

interface ModeState {
	mode: ColorMode;
	toggleMode: () => void;
}

export const useModeStore = create<ModeState>((set)=> ({
	mode: "blue",
	toggleMode: () => set((s) => ({mode: s.mode === "blue" ? "red": "blue"})),
}))

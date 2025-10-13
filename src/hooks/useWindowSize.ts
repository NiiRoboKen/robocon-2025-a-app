import { useSyncExternalStore } from "react";
import { setting, type Size } from "../controller.ts";

type WindowSize = {
	windowSize: Size;
	fieldSize: Size;
};

const getWindowWidth = () => {
	return window.innerWidth;
};
const getWindowHeight = () => {
	return window.innerHeight;
};
const subscribeWindowSizeChange = (callback: () => void) => {
	window.addEventListener("resize", callback);
	return () => window.removeEventListener("resize", callback);
};

export const useWindowSize = (): WindowSize => {
	const width = useSyncExternalStore(subscribeWindowSizeChange, getWindowWidth);
	const height = useSyncExternalStore(
		subscribeWindowSizeChange,
		getWindowHeight,
	);
	const fieldWidth =
		(height * setting.fieldScale.width) / setting.fieldScale.height;
	return {
		windowSize: { width: width, height: height },
		fieldSize: { width: fieldWidth, height: height },
	};
};

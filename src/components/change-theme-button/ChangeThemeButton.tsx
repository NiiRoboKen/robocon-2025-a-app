import { useModeStore } from "../../hooks/useController.ts";
import "./ChangeThemeButton.css";

const ChangeThemeButton = () => {
	const { toggleMode } = useModeStore.getState();

	return (
		<button className="change-theme-button" onClick={toggleMode}>
			Change Thema
		</button>
	);
};

export default ChangeThemeButton;

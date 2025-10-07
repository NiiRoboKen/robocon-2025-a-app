import {useModeStore} from "../../hooks/useController.ts";

const ChangeThemeButton = () => {

	const {toggleMode} = useModeStore();
	
	return (
		<button onClick={toggleMode}>Change Thema</button>
	);
}

export default ChangeThemeButton;

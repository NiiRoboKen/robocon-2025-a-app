import { useEffect } from "react";
import Konva from "./components/konva/konva.tsx";
import Information from "./components/information/Information.tsx";
import { useWebSocket } from "./websocket";
import ChangeThemeButton from "./components/change-theme-button/ChangeThemeButton.tsx";
import SendButton from "./components/send-button/SendButton.tsx";
import ArmButton from "./components/arm-button/ArmButton.tsx";
import "./App.css"

const App = () => {
	const { connect, disconnect } = useWebSocket();

	useEffect(() => {
		connect();
		return () => disconnect();
	}, [connect, disconnect]);

	return (
		<div className="buttons">
			<Konva />
			<div>
				<Information />
				<ArmButton />
				<SendButton />
				<ChangeThemeButton />
			</div>
		</div>
	);
};

export default App;

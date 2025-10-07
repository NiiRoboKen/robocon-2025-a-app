import { useEffect } from "react";
import Konva from "./components/konva/konva.tsx";
import Information from "./components/information/Information.tsx";
import { useWebSocket } from "./websocket";
import ChangeThemeButton from "./components/change-theme-button/ChangeThemeButton.tsx";
import SendButton from "./components/send-button/SendButton.tsx";

const App = () => {
	const { connect, disconnect } = useWebSocket();

	useEffect(() => {
		connect();
		return () => disconnect();
	}, [connect, disconnect]);

	return (
		<div>
			<Information />
			<SendButton />
			<ChangeThemeButton />
			<Konva />
		</div>
	);
};

export default App;

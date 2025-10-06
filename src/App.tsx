import { useEffect } from "react";
import Konva from "./components/konva/konva.tsx";
import Information from "./components/information/Information.tsx";
import { useWebSocket } from "./websocket";
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
			<Konva />
		</div>
	);
};

export default App;

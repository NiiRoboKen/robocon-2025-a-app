import { useEffect } from "react";
import Konva from "./components/konva/konva.tsx";
import Information from "./components/information/Information.tsx";
import { useWebSocket } from "./websocket";
import ChangeThemeButton from "./components/change-theme-button/ChangeThemeButton.tsx";
import SendButton from "./components/send-button/SendButton.tsx";
import ArmButton from "./components/arm-button/ArmButton.tsx";
import EspConnectingInfo from "./components/esp-connecting-info/EspConnectingInfo.tsx";
import SideArm from "./components/side-arm/SideArm.tsx";
import StopButton from "./components/stop-button/StopButton.tsx";
import FrontArmButtons from "./components/front-arms-buttons/FrontArmButtons.tsx";
import "./App.css";
import Preset from "./components/preset/Preset.tsx";

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
				<EspConnectingInfo />
				<ArmButton />
				<SendButton />
				<ChangeThemeButton />
				<SideArm />
				<StopButton />
				<FrontArmButtons />
				<Preset />
			</div>
		</div>
	);
};

export default App;

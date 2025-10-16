import { useEffect } from "react";
import Konva from "./components/konva/konva.tsx";
import { useWebSocket } from "./websocket";
import ChangeThemeButton from "./components/change-theme-button/ChangeThemeButton.tsx";
import SendButton from "./components/send-button/SendButton.tsx";
import EspConnectingInfo from "./components/esp-connecting-info/EspConnectingInfo.tsx";
import SideArm from "./components/side-arm/SideArm.tsx";
import StopButton from "./components/stop-button/StopButton.tsx";
import FrontArmButtons from "./components/front-arms-buttons/FrontArmButtons.tsx";
import "./App.css";
import Preset from "./components/preset/Preset.tsx";
import {
  ChakraProvider,
  defaultSystem,
  HStack,
  VStack,
} from "@chakra-ui/react";

const App = () => {
  const { connect, disconnect } = useWebSocket();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <ChakraProvider value={defaultSystem}>
      <div className="buttons">
        <VStack>
          <HStack>
            <StopButton />
            <EspConnectingInfo />
            <SendButton />
            <ChangeThemeButton />
          </HStack>
          <Konva />
        </VStack>

        <div>
          <VStack>
            <SideArm />
            <FrontArmButtons />
          </VStack>
        </div>
        <Preset />
      </div>
    </ChakraProvider>
  );
};

export default App;

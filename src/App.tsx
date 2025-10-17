import { useEffect } from "react";
import SetLocation from "./components/konva/konva.tsx";
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

import WebSocketConnecting from "./components/websocket-connectiong/WebSocketConnecting.tsx";

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
            <SendButton />
            <ChangeThemeButton />
          </HStack>
          <SetLocation />
        </VStack>

        <div>
          <VStack>
            <SideArm />
            <FrontArmButtons />
          </VStack>
        </div>
        <VStack>
          <HStack p={4}>
            <EspConnectingInfo />
            <WebSocketConnecting />
          </HStack>
          <Preset />
        </VStack>
      </div>
    </ChakraProvider>
  );
};

export default App;

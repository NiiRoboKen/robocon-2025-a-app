import { HStack, VStack } from "@chakra-ui/react";
import { useWebSocket } from "../../websocket.ts";
import { Button } from "../Button/Button";
import "./FrontArmButton.css";

const { sendMessage } = useWebSocket.getState();

const CollectModeButton = () => {
  return (
    <Button
      className="FrontArm"
      onClick={() => sendMessage({ command: "arm_collect_mode" })}
    >
      回収モード
    </Button>
  );
};
const HangCeilingButton = () => {
  return (
    <Button
      className="FrontArm"
      onClick={() => sendMessage({ command: "arm_ceiling_deploy" })}
    >
      天井セット
    </Button>
  );
};
const FoldButton = () => {
  return (
    <Button
      className="FrontArm"
      onClick={() => sendMessage({ command: "all_arm_fold_lower" })}
    >
      収納 前
    </Button>
  );
};
const RightSuctionOnButton = () => {
  return (
    <Button
      className="Suction"
      onClick={() =>
        sendMessage({ command: "right_arm_suction_on_off", is_on: true })
      }
    >
      吸引On 右
    </Button>
  );
};
const RighSuctiontOffButton = () => {
  return (
    <Button
      className="Suction"
      onClick={() =>
        sendMessage({ command: "right_arm_suction_on_off", is_on: false })
      }
    >
      吸引Off 右
    </Button>
  );
};
const LeftSuctionOnButton = () => {
  return (
    <Button
      className="Suction"
      onClick={() =>
        sendMessage({ command: "left_arm_suction_on_off", is_on: true })
      }
    >
      吸引On 左
    </Button>
  );
};
const LeftSuncitonOffButton = () => {
  return (
    <Button
      className="Suction"
      onClick={() =>
        sendMessage({ command: "left_arm_suction_on_off", is_on: false })
      }
    >
      吸引Off 左
    </Button>
  );
};

const FrontArmButtons = () => {
  return (
    <div className="LeftDiv">
      <VStack p={5}>
        <h2 className="title">フロントアーム</h2>

        <CollectModeButton />
        <HangCeilingButton />
        <FoldButton />
      </VStack>

      <VStack p={5}>
        <HStack>
          <RightSuctionOnButton />
          <LeftSuctionOnButton />
        </HStack>
        <HStack>
          <RighSuctiontOffButton />
          <LeftSuncitonOffButton />
        </HStack>
      </VStack>
    </div>
  );
};

export default FrontArmButtons;

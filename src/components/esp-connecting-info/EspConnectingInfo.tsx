import { Box } from "@chakra-ui/react";
import { useWebSocket } from "../../websocket.ts";
import "./EspConnectingInfo.css";

const EspConnectingInfo = () => {
  const { espConnecting } = useWebSocket();
  //espConnectingはboolean
  // espが接続されてたらture
  // 接続されてなければfalse

  if (espConnecting == true) {
    return (
      <div className="esp">
        <p className="espStatus">esp status</p>
        <p>通信可能です</p>
      </div>
    );
  } else {
    return (
      <div className="esp">
        <p className="espStatus">esp status</p>
        <p>接続されていません</p>
      </div>
    );
  }
};
export default EspConnectingInfo;

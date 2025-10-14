import { useWebSocket } from "../../websocket.ts";

const EspConnectingInfo = () => {
  const { espConnecting } = useWebSocket();
  //espConnectingはboolean
  // espが接続されてたらture
  // 接続されてなければfalse

  if (espConnecting == true) {
    return (
      <>
        <p>espと通信可能です</p>
      </>
    );
  } else {
    return (
      <>
        <p>espが接続されていません</p>
      </>
    );
  }
};
export default EspConnectingInfo;

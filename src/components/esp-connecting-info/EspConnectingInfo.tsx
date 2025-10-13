import { useWebSocket } from "../../websocket.ts";

const EspConnectingInfo = () => {
	const { espConnecting } = useWebSocket();
	//espConnectingはboolean 
	// espが接続されてたらture
	// 接続されてなければfalse
};
export default EspConnectingInfo;

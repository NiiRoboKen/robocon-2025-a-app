export type Commands =
	| ConnectionSucces
	| ConnectionFaild
	| SetLocation
	| CurrentLocation
	| ArmStop
	| LeftArmMove
	| RightArmMove
	| LeftArmFoldUpper
	| RightArmFoldUpper
	| LeftArmFoldLower
	| RightArmFoldLower
	| ArmSuctionOnOff
	| EmergencyStop
	| SideArmOpen
	| SideArmOpenMax
	| SideArmFold;

export type BoxSize = "A" | "B" | "C" | "D" | "E";

export type EmergencyStop = {
	command: "emergency_stop";
};

export type ConnectionSucces = {
	command: "connection_success";
};

export type ConnectionFaild = {
	command: "connection_failed";
	error_code: number;
};

export type SetLocation = {
	command: "set_location";
	x: number;
	y: number;
	degree: number;
};

export type CurrentLocation = {
	command: "current_location";
	x: number;
	y: number;
	degree: number;
};

export type ArmStop = {
	command: "arm_stop";
};

export type LeftArmMove = {
	command: "left_arm_move";
	box: BoxSize;
};

export type RightArmMove = {
	command: "right_arm_move";
	box: BoxSize;
};

export type LeftArmFoldUpper = {
	command: "left_arm_fold_upper";
};

export type RightArmFoldUpper = {
	command: "right_arm_fold_upper";
};

export type LeftArmFoldLower = {
	command: "left_arm_fold_lower";
};

export type RightArmFoldLower = {
	command: "right_arm_fold_lower";
};

export type ArmSuctionOnOff = {
	//吸引
	command: "arm_suction_on_off";
	is_on: boolean;
};

export type SideArmOpen = {
	command: "side_arm_open";
};

export type SideArmOpenMax = {
	command: "side_arm_open_max";
};

export type SideArmFold = {
	command: "side_arm_fold";
};

export type Commands =
  | ReceiveSuccess
  | Ping
  | ReceiveFailed
  | EmergencyStop
  | CurrentLocation
  | SetLocation
  | AllSideArmOpen
  | RightSideArmOpen
  | LeftSideArmOpen
  | SideArmOpenMax
  | AllSideArmFold
  | RightSideArmFold
  | LeftSideArmFold
  | AllArmStop
  | RightArmStop
  | LeftArmStop
  | ArmCeilingDeploy
  | ArmCollectMode
  | AllArmFoldUpper
  | AllArmFoldLower
  | RightArmFoldLower
  | LeftArmFoldLower
  | AllArmStart
  | RightArmStart
  | LeftArmStart
  | AllArmSuctionOnOff
  | RightArmSuctionOnOff
  | LeftArmSuctionOnOff;


export type ReceiveSuccess = {
  command: "receive_success",
}

export type Ping = {
  command: "ping",
}

export type ReceiveFailed = {
  command: "receive_failed",
  error_code: number,
}

export type EmergencyStop = {
  command: "emergency_stop",
}

export type CurrentLocation = {
  command: "current_location",
  x: number,
  y: number,
  degree: number
}

export type SetLocation = {
  command: "set_location",
  x: number,
  y: number,
  degree: number
}

export type AllSideArmOpen = {
  command: "all_side_arm_open",
}

export type RightSideArmOpen = {
  command: "right_side_arm_open",
}

export type LeftSideArmOpen = {
  command: "left_side_arm_open",
}

export type SideArmOpenMax = {
  command: "side_arm_open_max",
}

export type AllSideArmFold = {
  command: "all_side_arm_fold",
}

export type RightSideArmFold = {
  command: "right_side_arm_fold",
}

export type LeftSideArmFold = {
  command: "left_side_arm_fold",
}

export type AllArmStop = {
  command: "all_arm_stop",
}

export type RightArmStop = {
  command: "right_arm_stop",
}

export type LeftArmStop = {
  command: "left_arm_stop",
}

export type ArmCeilingDeploy = {
  command: "arm_ceiling_deploy",
}

export type ArmCollectMode = {
  command: "arm_collect_mode",
}

export type AllArmFoldUpper = {
  command: "all_arm_fold_upper",
}

export type AllArmFoldLower = {
  command: "all_arm_fold_lower",
}

export type RightArmFoldLower = {
  command: "right_arm_fold_lower",
}

export type LeftArmFoldLower = {
  command: "left_arm_fold_lower",
}

export type AllArmStart = {
  command: "all_arm_start",
}

export type RightArmStart = {
  command: "right_arm_start",
}

export type LeftArmStart = {
  command: "left_arm_start",
}

export type AllArmSuctionOnOff = {
  command: "all_arm_suction_on_off",
  is_on: boolean,
}

export type RightArmSuctionOnOff = {
  command: "right_arm_suction_on_off",
  is_on: boolean,
}

export type LeftArmSuctionOnOff = {
  command: "left_arm_suction_on_off",
  is_on: boolean,
}

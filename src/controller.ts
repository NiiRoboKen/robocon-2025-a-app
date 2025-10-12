import useImage from "use-image";

export type Field = {
	x: number;
	y: number;
};

export type Position = Field & {
	theta: number;
};

class Setting {
	fieldSize = { width: 525, height: 1050 };
	robotSize = { width: 100, height: 100 };

	ownBoxArea = { width: 250, height: 200 };
	shareBoxArea = { width: 60, height: 370 };
	workingArea = { width: 525, height: 500, x: 0, y: 550 };
	gateArea = { width: 525, height: 100, x: 0, y: 650 };
	footSpot = { width: 100, height: 100 };
	startZone = { width: 100, height: 100 };

	get defaultRobotPosition() {
		return {
			x: this.fieldSize.width / 2 - this.robotSize.width / 2,
			y: this.fieldSize.height - this.robotSize.height,
			theta: 0,
		};
	}
}

export const setting = new Setting();

class modeTheme {
	blue = {
		colors: {
			backGround: "#87CEFA",
			workingArea: "#6495ED",
			other: "#1E90FF",
			robotColor: "#FF0000",
		},
		fieldImageSrc: "http://localhost:5173/RoboconFieldBlue.png",
	};
	red = {
		colors: {
			backGround: "#FFC0CB",
			workingArea: " 	#FF69B4",
			other: "#FF0000",
			robotColor: "#1E90FF",
		},
		fieldImageSrc: "http://localhost:5173/RoboconFieldRed.png",
	};
}

export const ModeTheme = new modeTheme();

export type Commands =
	| Pong
	| SetLocation
	| CurrentLocation
	| LeftArmMove
	| RightArmMove;

export type BoxSize = "A" | "B" | "C" | "D" | "E";

export type Pong = {
	command: "pong";
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

export type LeftArmMove = {
	command: "left_arm_move";
	box: BoxSize;
};

export type RightArmMove = {
	command: "right_arm_move";
	box: BoxSize;
};

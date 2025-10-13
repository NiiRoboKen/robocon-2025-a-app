export type Position = {
	x: number;
	y: number;
};

export type Status = Position & {
	theta: number;
};

class Setting {
	fieldSize = { width: 525, height: 1050 };
	robotSize = { width: 100, height: 100 };

	get defaultRobotPosition() {
		return {
			x: this.fieldSize.width / 2 - this.robotSize.width / 2,
			y: this.fieldSize.height - this.robotSize.height,
			theta: 0,
		};
	}
	get fieldSizeScale() {
		return {
			width:
				(window.innerHeight * this.fieldSize.width) / this.fieldSize.height,
			height: window.innerHeight,
		};
	}
	get robotSizeScale() {
		return {
			width:
				(this.fieldSizeScale.width * this.robotSize.width) /
				this.fieldSize.width,
			height:
				(this.fieldSizeScale.height * this.robotSize.height) /
				this.fieldSize.height,
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
	| SetLocation
	| CurrentLocation
	| LeftArmMove
	| RightArmMove
	| ConnectionSuccess
	| ConnectionFailed;

export type BoxSize = "A" | "B" | "C" | "D" | "E";

export type ConnectionSuccess = {
	command: "connection_success";
};

export type ConnectionFailed = {
	command: "connection_failed";
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

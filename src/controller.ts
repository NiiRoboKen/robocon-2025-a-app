export type Field = {
	x: number;
	y: number;
};

export type Position = Field & {
	theta: number;
};

class	Setting {
	fieldSize =  { width: 525, height: 1050 };
	robotSize = { width: 100, height: 100 };

	ownBoxArea = { width: 250, height: 200 };
	shareBoxArea = { width: 60, height: 370 };
	workingArea = { width: 525, height: 500, x: 0, y: 550 };
	gateArea = { width: 525, height: 100, x: 0, y: 650 };
	footSpot = { width: 100, height: 100 };
	startZone = { width: 100, height: 100 };

	get defaultRobotPosition() {
		return {
			x: 0,
			y: this.fieldSize.height - this.robotSize.height,
			theta: 0,
		};
	}
};

export const setting = new Setting();

export const modeThema = {
	blue: {
		colors: {
			backGround: "#87CEFA",
			workingArea: "#6495ED",
			other: "#1E90FF",
		},
		ownBoxAreaPosition: { x: 275, y: 0 },
		shareBoxAreaPosition: { x: 0, y: 0 },
		footSpotPosition: { x: setting.fieldSize.width - 100, y: 650 },
		startZonePosition: {
			x: setting.fieldSize.width - setting.startZone.width,
			y: setting.fieldSize.height - setting.startZone.height,
		}
	},
	red: {
		colors: {
			backGround: "#FFC0CB",
			workingArea: " 	#FF69B4",
			other: "#FF0000",
		},
		ownBoxAreaPosition: { x: 0, y: 0 },
		shareBoxAreaPosition: { x: 465, y: 0 },
		footSpotPosition: { x: 0, y: 650 },
		startZonePosition: {
			x: 0,
			y: setting.fieldSize.height - setting.startZone.height,
		}
	},
};

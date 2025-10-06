export type Field = {
	x: number;
	y: number;
};

export type Position = Field & {
	theta: number;
};

class Setting {
  fieldSize = { x: 525, y: 1050 };
  robotSize = { x: 150, y: 150 };

  get defaultRobotPosition() {
    return {
      x: 0,
      y: this.fieldSize.y - this.robotSize.y,
      theta: 0,
    };
  }
}

export const setting = new Setting();

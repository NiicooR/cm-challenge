export type ColorType = "blue" | "red" | "purple" | "white";

export type DirectionType = "up" | "down" | "right" | "left";

export type AstralObjectType = "SPACE" | "POLYANET" | "COMETH" | "SOLOON";

export const ColorValues = ["BLUE", "RED", "PURPLE", "WHITE"];
export const DirectionValues = ["UP", "DOWN", "RIGHT", "LEFT"];

export type AstralArguments = {
  row: number;
  column: number;
  color?: ColorType;
  direction?: DirectionType;
};

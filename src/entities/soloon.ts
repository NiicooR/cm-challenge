import { CrossmintClient } from "../services/crossmint-client.service";
import { AstralArguments, ColorType } from "../services/types";
import { AstralObject } from "./astralObject";

export class Soloon extends AstralObject {
  private color: ColorType;
  constructor(
    args: Required<Pick<AstralArguments, "row" | "column" | "color">>
  ) {
    const { color, ...positionArgs } = args;
    super(positionArgs);
    this.color = color;
  }

  async create(client: CrossmintClient) {
    await client.postSoloons({
      row: this.row,
      column: this.column,
      color: this.color,
    });
  }
}

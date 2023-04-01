import { CrossmintClient } from "../services/crossmint-client.service";
import { AstralArguments, DirectionType } from "../services/types";
import { AstralObject } from "./astralObject";

export class Cometh extends AstralObject {
  private direction: DirectionType;
  constructor(
    args: Required<Pick<AstralArguments, "row" | "column" | "direction">>
  ) {
    const { direction, ...positionArgs } = args;
    super(positionArgs);
    this.direction = direction;
  }

  async create(client: CrossmintClient) {
    await client.postComeths({
      row: this.row,
      column: this.column,
      direction: this.direction,
    });
  }
}

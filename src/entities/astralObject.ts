import { CrossmintClient } from "../services/crossmint-client.service";
import { AstralArguments } from "../services/types";

export enum AstralObjects {
  COMETH = "COMETH",
  SPACE = "SPACE",
  POLYANET = "POLYANET",
  SOLOON = "SOLOON",
}

export abstract class AstralObject {
  protected row: number;
  protected column: number;
  constructor(positionArgs: Pick<AstralArguments, "row" | "column">) {
    this.row = positionArgs.row;
    this.column = positionArgs.column;
  }

  async delete(client: CrossmintClient) {
    await client.delete({ row: this.row, column: this.column });
  }

  abstract create(client: CrossmintClient): Promise<void>;
}

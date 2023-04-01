import { CrossmintClient } from "../services/crossmint-client.service";
import { AstralObject } from "./astralObject";

export class Polyanet extends AstralObject {
  async create(client: CrossmintClient) {
    await client.postPolyanets({
      row: this.row,
      column: this.column,
    });
  }
}

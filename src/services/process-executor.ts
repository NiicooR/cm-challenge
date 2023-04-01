import { AstralCreator } from "../entities/astralCreator";
import { CrossmintClient } from "./crossmint-client.service";

export const execute = async () => {
  const client = CrossmintClient.instance;

  const goalMap = await client.getGoal();

  let megaverse = goalMap.data.goal
    .flatMap((row, rowNum) =>
      row.map((astralObject, colNum) =>
        AstralCreator.createObject(astralObject, {
          row: rowNum,
          column: colNum,
        })
      )
    )
    .filter((e) => e);

  const BATCH_SIZE = 5;
  for (let i = 0; i < megaverse.length; i += BATCH_SIZE) {
    try {
      const batch = megaverse.slice(i, i + BATCH_SIZE);
      const promises = batch.map((astralObject) => {
        return astralObject!.create(client);
      });

      await Promise.allSettled(promises);
    } catch (error) {
      console.log(
        "An error occurred executing request",
        (error as Error).message
      );
    }
  }
};

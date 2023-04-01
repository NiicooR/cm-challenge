import {
  AstralArguments,
  ColorType,
  ColorValues,
  DirectionType,
  DirectionValues,
} from "../services/types";
import { AstralObject, AstralObjects } from "./astralObject";
import { Cometh } from "./cometh";
import { Polyanet } from "./polyanet";
import { Soloon } from "./soloon";

const SEPARATOR = "_";

export class AstralCreator {
  static createObject(
    astralDescription: string,
    positionArgs: Pick<AstralArguments, "row" | "column">
  ): AstralObject | null {
    const { astralObj, astralAttr } = parseAstralObject(astralDescription);

    const optionalArgs = getAttributeArguments(astralAttr);

    switch (astralObj) {
      case AstralObjects.COMETH:
        if (optionalArgs) {
          return new Cometh({
            ...positionArgs,
            ...(optionalArgs as Required<Pick<AstralArguments, "direction">>),
          });
        }
      case AstralObjects.SPACE:
        return null;
      case AstralObjects.POLYANET:
        return new Polyanet(positionArgs);
      case AstralObjects.SOLOON:
        if (optionalArgs) {
          return new Soloon({
            ...positionArgs,
            ...(optionalArgs as Required<Pick<AstralArguments, "color">>),
          });
        }
      default:
        throw new Error("Unknown astral object");
    }
  }
}

function getAttributeArguments(
  attribute: string | null
):
  | Required<Pick<AstralArguments, "color">>
  | Required<Pick<AstralArguments, "direction">>
  | null {
  let args = null;
  if (attribute) {
    if (ColorValues.includes(attribute)) {
      args = {
        color: attribute.toLocaleLowerCase() as ColorType,
      };
    } else if (DirectionValues.includes(attribute)) {
      args = {
        direction: attribute.toLocaleLowerCase() as DirectionType,
      };
    }
  }
  return args;
}

function parseAstralObject(rawObject: string) {
  const parsed = rawObject.split(SEPARATOR);
  let astralObj: string;
  let astralAttr: string | null;

  if (parsed.length == 2) {
    astralObj = parsed[1];
    astralAttr = parsed[0];
  } else {
    astralAttr = null;
    astralObj = parsed[0];
  }
  return {
    astralObj,
    astralAttr,
  };
}

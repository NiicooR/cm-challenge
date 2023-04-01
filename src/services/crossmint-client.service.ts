import axios, { AxiosInstance } from "axios";
import axiosRetry, { isNetworkOrIdempotentRequestError } from "axios-retry";
import { AstralObjects } from "../entities/astralObject";
import { AstralArguments } from "./types";

const CANDIDATE_ID = `4dd3154b-2daf-4aac-998b-c6a65f9f4698`; //TODO This must be in an env var
const BASE_URL = "https://challenge.crossmint.io/api";
const GOAL_METHOD = `/map/${CANDIDATE_ID}/goal`;
const POLYANETS = `/polyanets`;
const SOLOONS = `/soloons`;
const COMETHS = `/comeths`;

const authArg = {
  candidateId: CANDIDATE_ID,
};

export class CrossmintClient {
  private static _instance: CrossmintClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
    });
    axiosRetry(axiosInstance, {
      retries: Infinity,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (e) => {
        return (
          isNetworkOrIdempotentRequestError(e) ||
          e.response?.status === 429 ||
          e.response?.status === 404
        );
      },
    });

    this.axiosInstance = axiosInstance;
  }

  public static get instance(): CrossmintClient {
    if (!CrossmintClient._instance) {
      CrossmintClient._instance = new CrossmintClient();
    }
    return CrossmintClient._instance;
  }

  async getGoal() {
    return await this.axiosInstance.get<{ goal: AstralObjects[][] }>(
      GOAL_METHOD
    );
  }

  async delete(args: Pick<AstralArguments, "column" | "row">) {
    return await this.axiosInstance.delete(POLYANETS, {
      data: {
        ...authArg,
        ...args,
      },
    });
  }

  async postPolyanets(args: AstralArguments) {
    await this.post(args, AstralObjects.POLYANET);
  }
  async postComeths(args: AstralArguments) {
    await this.post(args, AstralObjects.COMETH);
  }
  async postSoloons(args: AstralArguments) {
    await this.post(args, AstralObjects.SOLOON);
  }
  async post(args: AstralArguments, astralObject: AstralObjects) {
    let method;
    switch (astralObject) {
      case AstralObjects.COMETH:
        method = COMETHS;
        break;
      case AstralObjects.POLYANET:
        method = POLYANETS;
        break;
      case AstralObjects.SOLOON:
        method = SOLOONS;
        break;

      default:
        throw new Error("Undefined astral object");
    }

    return await this.axiosInstance.post(method, {
      ...authArg,
      ...args,
    });
  }
}

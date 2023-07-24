import { devlopmentLogger } from "./developmentLogger";
import { productionLogger } from "./productionLogger";
import { Logger } from "winston";

let logger: Logger | null = null;

if (process.env.NODE_ENV === "development") {
  logger = devlopmentLogger()
}

if (process.env.NODE_ENV === "production") {
  logger = productionLogger()
}

export default logger;

import { IProcessor, LogData } from "./processor";
import * as readline from "readline";
import { createReadStream } from "fs";
import { writeFile } from "fs/promises";
import * as events from "events";

export interface IRWManager {
  Read(fileName: string, processor: IProcessor): void;
  Write(fileName: string, data: LogData[]): void;
}

export default class RWManager implements IRWManager {
  async Read(fileName: string, processor: IProcessor): Promise<void> {
    try {
      if (!fileName) {
        throw Error("Invalid Read FileName");
      }

      const rl = readline.createInterface({
        input: createReadStream(fileName),
        crlfDelay: Infinity,
      });

      rl.on("line", (line) => {
        processor.ProcessLog(line);
      });
      await events.once(rl, "close");
    } catch (Error) {
      console.log(`Error While Reading: ${Error.message}`);
    }
  }

  async Write(fileName: string, data: LogData[]): Promise<void> {
    try {
      if (!fileName) {
        throw Error("Invalid Write FileName");
      }
      await writeFile(fileName, JSON.stringify(data ?? "No Data"), "utf-8");
    } catch (Error) {
      console.log(`Write Failed: ${Error.message}`);
    }
  }
}

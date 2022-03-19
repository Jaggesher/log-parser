import Processor, { IProcessor } from "./processor";
import RWManager, { IRWManager } from "./rw-manager";

export default class Parser {
  private inputFileName: string;
  private outputFilename: string;
  private processor: IProcessor;
  private rwManager: IRWManager;
  constructor() {
    this.processor = new Processor();
    this.rwManager = new RWManager();
  }

  ValidateInstructions(instructions: string[]): boolean {
    if (instructions.length != 4) {
      console.log(
        "Please follow '--input filename --output filename' pattern."
      );
      return false;
    }

    this.inputFileName =
      instructions[0] == "--input"
        ? instructions[1]
        : instructions[2] == "--input"
        ? instructions[3]
        : null;

    this.outputFilename =
      instructions[0] == "--output"
        ? instructions[1]
        : instructions[2] == "--output"
        ? instructions[3]
        : null;

    return this.inputFileName && this.outputFilename ? true : false;
  }

  async Parse(): Promise<void> {
    await this.rwManager.Read(this.inputFileName, this.processor);
    await this.rwManager.Write(
      this.outputFilename,
      this.processor.GetFilteredLog()
    );

    const summary = this.processor.Summary();
    console.log("Summary: ", summary);
    if (summary.ambiguous > 0) {
      console.log("Ambiguous Logs: "); // May transport to another file
      console.log(this.processor.GetAmbiguousLogs());
    }
  }
}

(async function () {
  const parser = new Parser();
  if (parser.ValidateInstructions(process.argv.slice(2))) {
    await parser.Parse();
  }
})();

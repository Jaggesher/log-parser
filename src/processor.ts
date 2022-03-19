export type LogData = {
  timestamp: number;
  loglevel: string;
  transactionId: string;
  err: string;
};

export type ProcessorSummary = {
  total: number; // Total log processed by This Object
  filtered: number; // How many are filtered
  ambiguous: number; // How many are Evil
};

export interface IProcessor {
  ProcessLog(data: string): void;
  GetFilteredLog(): LogData[];
  GetAmbiguousALogs(): string[];
  Summary(): ProcessorSummary;
}

export default class Processor implements IProcessor {
  private totalLogs: number;
  private ambiguousLogs: string[];
  private filteredLog: LogData[];

  constructor(private readonly FILTERING_LOG_TYPES: string[] = ["error"]) {
    this.totalLogs = 0;
    this.filteredLog = [];
    this.ambiguousLogs = [];
  }

  ProcessLog(data: string): void {
    try {
      this.totalLogs++;

      //Example:  2021-08-09T02:12:51.259Z - error - {"transactionId":"424234-2423-4234-2-423-4234","details":"the details","code": 404,"err":"the err"}
      const splitData = data.split(" - "); // [{UNIX Time}, {LogLevel}, {JSON INFO}....]
      if (splitData.length < 3) {
        throw Error("Log format is Wrong");
      }

      if (!this.FILTERING_LOG_TYPES.includes(splitData[1])) {
        return;
      }

      const info = JSON.parse(splitData.slice(2).join(" - "));

      const resp: LogData = {
        timestamp: new Date(splitData[0]).getTime(),
        loglevel: splitData[1],
        transactionId: info?.transactionId ? info?.transactionId : "Not Found",
        err: info?.err ? info?.err : "Not found",
      };
      this.filteredLog.push(resp);
    } catch (Error) {
      console.log("Got an Evil Log: ", Error.message);
      this.ambiguousLogs.push(data);
    }
  }

  GetFilteredLog(): LogData[] {
    return this.filteredLog;
  }

  GetAmbiguousALogs(): string[] {
    return this.ambiguousLogs;
  }

  Summary(): ProcessorSummary {
    return {
      total: this.totalLogs,
      ambiguous: this.ambiguousLogs.length,
      filtered: this.filteredLog.length,
    };
  }
}

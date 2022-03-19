import Processor, { ProcessorSummary } from "../src/processor";
const mocData = [
  '2021-08-09T02:12:51.258Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"About to request user orders list","userId":16}',
  '2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}',
  '2021-08-09T02:12:51.259Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user": {"id": 16, "name": "Michael"}}',
  '2021-08-09T02:12:51.259Z - error -  {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821",weird JSON}',
];

describe("Processor", () => {
  let processor = new Processor();
  for (let data of mocData) {
    processor.ProcessLog(data);
  }

  describe("GetFilteredLog", () => {
    it("Should return array of length 1", () => {
      expect(processor.GetFilteredLog().length).toBe(1);
    });
  });

  describe("GetAmbiguousLogs", () => {
    it("Should return array of length 1", () => {
      expect(processor.GetAmbiguousLogs().length).toBe(1);
    });
  });

  describe("Summary", () => {
    it("Should return Object", () => {
      const result: ProcessorSummary = { total: 4, ambiguous: 1, filtered: 1 };
      expect(processor.Summary()).toEqual(result);
    });
  });
});

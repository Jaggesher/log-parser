import Parser from "../src/parser";

describe("Parser", () => {
  describe("ValidateInstructions", () => {
    let parser = new Parser();
    it("ValidateInstructions, should return false", () => {
      expect(parser.ValidateInstructions([])).toBe(false);
    });

    it("ValidateInstructions, should return false", () => {
      const input = ["--output", "fileName"];
      expect(parser.ValidateInstructions(input)).toBe(false);
    });

    it("ValidateInstructions, should return false", () => {
      const input = ["--output", "fileName", "--inpu", "fileName"];
      expect(parser.ValidateInstructions(input)).toBe(false);
    });

    it("ValidateInstructions, should return true", () => {
      const input = ["--output", "fileName", "--input", "fileName"];
      expect(parser.ValidateInstructions(input)).toBe(true);
    });

    it("ValidateInstructions, should return false", () => {
      const input = ["--input", "fileName", "--input", "fileName"];
      expect(parser.ValidateInstructions(input)).toBe(false);
    });

    it("ValidateInstructions, should return true", () => {
      const input = ["--input", "fileName", "--output", "fileName"];
      expect(parser.ValidateInstructions(input)).toBe(true);
    });
  });
});

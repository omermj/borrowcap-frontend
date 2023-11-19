import {
  formatBoolean,
  formatCurrency,
  formatDate,
  formatPercent,
} from "./format";

describe("formatCurrency Function", () => {
  it("formats positive number correctly", () => {
    const result = formatCurrency("1234.56");
    expect(result).toBe("$1,234.56");
  });

  it("formats negative number correctly", () => {
    const result = formatCurrency("-7890.12");
    expect(result).toBe("-$7,890.12");
  });

  it("formats zero correctly", () => {
    const result = formatCurrency("0");
    expect(result).toBe("$0.00");
  });

  it("should throw an error for non-number input", () => {
    expect(() => formatCurrency("abc")).toThrowError(
      "Invalid input. Please provide a valid number."
    );
  });

  it("should throw an error for NaN input", () => {
    expect(() => formatCurrency(NaN)).toThrowError(
      "Invalid input. Please provide a valid number."
    );
  });

  it("should throw an error for undefined input", () => {
    expect(() => formatCurrency(undefined)).toThrowError(
      "Invalid input. Please provide a valid number."
    );
  });
});

describe("formatDate function", () => {
  it("should throw an error for an invalid date input", () => {
    const invalidDate = "This is not a date";
    expect(() => formatDate(invalidDate)).toThrow("Error formatting date");
  });
});

describe("formatPercent function", () => {
  it("should format a valid percentage", () => {
    const inputPercentage = 0.456;
    const formattedPercentage = formatPercent(inputPercentage);

    expect(formattedPercentage).toBe("45.60%");
  });

  it("should throw an error for an invalid percentage input", () => {
    const invalidPercentage = "This is not a number";
    expect(() => formatPercent(invalidPercentage)).toThrow(
      "Invalid number value"
    );
  });
});

describe("formatBoolean function", () => {
  it('should format true as "Yes"', () => {
    const formattedValue = formatBoolean(true);

    expect(formattedValue).toBe("Yes");
  });

  it('should format false as "No"', () => {
    const formattedValue = formatBoolean(false);

    expect(formattedValue).toBe("No");
  });

  it("should throw an error for an invalid boolean input", () => {
    const invalidBoolean = "This is not a boolean";
    expect(() => formatBoolean(invalidBoolean)).toThrow(
      "Invalid boolean value"
    );
  });
});

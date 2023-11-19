"use strict";

/** Helper functions to format data */

/** Format currency in $XX,XXX.XX format */
function formatCurrency(num) {
  if (typeof +num !== "number" || isNaN(+num)) {
    throw new Error("Invalid input. Please provide a valid number.");
  }
  try {
    num = +num;
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch (e) {
    throw new Error("Error formatting number value: " + e.message);
  }
}

/** Format date in YYYY-MM-DD format */
function formatDate(dateVal) {
  try {
    const date = new Date(dateVal);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date input");
    }
    return date.toLocaleDateString("en-CA");
  } catch (error) {
    throw new Error("Error formatting date");
  }
}

/** Format percentage in X.XX% format */
// function formatPercent(val) {
//   return String(Number.parseFloat(val * 100).toFixed(2)) + "%";
// }
function formatPercent(val) {
  const numericValue = Number.parseFloat(val);

  if (Number.isNaN(numericValue)) {
    throw new Error("Invalid number value");
  }

  return String((numericValue * 100).toFixed(2)) + "%";
}

/** Show boolean value as Yes or No */
function formatBoolean(val) {
  if (typeof val !== "boolean") {
    throw new Error("Invalid boolean value");
  }

  return val ? "Yes" : "No";
}

export { formatCurrency, formatDate, formatPercent, formatBoolean };

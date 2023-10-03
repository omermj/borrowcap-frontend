"use strict";

/** Helper functions to format data */

function formatCurrency(num) {
  return "$" + num.toLocaleString("en-CA", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(dateVal) {
  const date = new Date(dateVal);
  return date.toLocaleDateString("en-CA");
}

function formatPercent(val) {
  return String(Number.parseFloat(val * 100).toFixed(2)) + "%";
}

export { formatCurrency, formatDate, formatPercent };

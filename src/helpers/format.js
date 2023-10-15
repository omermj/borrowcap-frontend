"use strict";

/** Helper functions to format data */

function formatCurrency(num) {
  num = +num;
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
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

function formatBoolean(val) {
  return val ? "Yes" : "No";
}

export { formatCurrency, formatDate, formatPercent, formatBoolean };

/**
 * Remove all non-digit characters
 * @param {string} str 
 */
function onlyDigits(str) {
  return str.replace(/[^0-9]/g, '');
}

/**
 * Format text to number format
 * @param {string} str 
 */
function formatNumber(str) {
  const digits = onlyDigits(str);

  return new Intl.NumberFormat().format(digits);
}


export default {
  onlyDigits,
  formatNumber
};

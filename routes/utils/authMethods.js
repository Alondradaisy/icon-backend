//brings in validators to validate field inputs from validator npm library
const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator");

const scanIsEmpty = (target) => (isEmpty(target) ? true : false); //ternary statement that scans to see if the field was left empty
//shorthand ternary -> if the target field is empty? true : if not empty false

const scanIsStrongPassword = (password) =>
  isStrongPassword(password) ? true : false; // scans to check password strength

const scanIsEmail = (email) => (isEmail(email) ? true : false); //scans to check if field input is in email format

const scanIsAlpha = (target) => (isAlpha(target) ? true : false); //scans to check that field input only contains alphabet letters

const scanIsAlphanumeric = (target) => (isAlphanumeric(target) ? true : false); //scans to check that field input only contains alphabet and numerical values

module.exports = {
  scanIsEmpty,
  scanIsStrongPassword,
  scanIsEmail,
  scanIsAlpha,
  scanIsAlphanumeric,
};

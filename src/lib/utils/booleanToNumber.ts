/**
 * Function booleanToNumber
 * function that converts booleans to number to store in the database
 * @param  val value which will be converted to number if necessary
 * @return result what we want for our database
 */

function booleanToNumber(n: any) {
  if (typeof n === "number") return n;
  return n ? 1 : 0;
}

export { booleanToNumber };

/**
 * function that receives a number and converts it to boolean because postgresql doesn't support boolean
 * but it expects that a true boolean might somehow be passed
 * @param {number | boolean} n
 * @return {boolean} boolean
 */
export function numberToBoolean(n: any): boolean {
  if (typeof n == "boolean") return n;
  return n ? true : false;
}

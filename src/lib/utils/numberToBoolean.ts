export function numberToBoolean(n: any): boolean {
  if (typeof n === "boolean") return n;
  return n ? true : false;
}

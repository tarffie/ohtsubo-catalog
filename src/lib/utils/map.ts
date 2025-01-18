import { Service, ServiceInput } from "../interfaces/Service";
import { booleanToNumber } from "./booleanToNumber";

/**
 * function to map element with type ServiceInput to Service so we
 * send it to database and do database operations
 *@param {ServiceInput} body body from request
 *@return {Service} parsedBody
 */

export const mapToService = (body: ServiceInput): Service => ({
  id: body.id,
  title: body.title || "",
  description: body.description || "",
  price: body.price || 0,
  availabilityStatus: booleanToNumber(body.availabilityStatus),
  quantity: body.quantity || 0,
});

/**
 * function to map desired props from object so we can iterate through it for ReactJS
 *@param {Object} obj the object we wanna map
 *@param {string[]} targets the desired props we're targeting
 *@return {Array<any>} an array with the desired props
 */

export const mapObjProps = (
  obj: Object,
  targets: Array<string>,
): Record<string, any> => {
  const newObj: Record<string, any> = {};

  Object.keys(obj).forEach((key, index, arr) => {
    if (arr.includes(key)) {
      newObj[key] = (obj as Record<string, any>)[key];
    }
  });

  return newObj;
};

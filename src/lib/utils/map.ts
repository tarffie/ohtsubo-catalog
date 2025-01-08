import { ServiceInput } from "../interfaces/Service";

export const mapToService = (body: ServiceInput): ServiceInput => ({
  id: body.id,
  title: body.title || "",
  description: body.description || "",
  price: body.price || 0,
  availabilityStatus: body.availabilityStatus ?? false,
  minimumOrderQuantity: body.minimumOrderQuantity || 0,
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

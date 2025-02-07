import { Service } from "../interfaces/Service";

/**
 * function to map element with type ServiceInput to Service so we
 * send it to database and do database operations
 *@param {Service} body body from request
 *@return {Service} parsedBody
 */

export const mapToService = (body: Service): Service => ({
  id: body.id,
  title: body.title || "",
  description: body.description || "",
  price: body.price || 0,
});

/**
 * function to map desired props from object so we can iterate through it for ReactJS
 *@param {Object} obj the object we wanna map
 *@return {Array<any>} an array with the props
 */

export const mapObjProps = (obj: object): Record<string, unknown> => {
  const newObj: Record<string, unknown> = {};

  Object.keys(obj).forEach((key: string, index: number, arr: unknown[]) => {
    if (arr.includes(key)) {
      newObj[key] = (obj as Record<string, unknown>)[key];
    }
  });

  return newObj;
};

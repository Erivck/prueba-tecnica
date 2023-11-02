export const omitPropertyFromObject = <T extends Record<string, any>>(object: T, property: keyof T): Record<string, any> => {
  const {[property]: _, ...filteredObject} = object;
  return filteredObject;
}
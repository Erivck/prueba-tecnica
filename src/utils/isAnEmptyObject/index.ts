export const isAnEmptyObject = (object: object) => {
  return !Object.values(object).filter(Boolean).length;
}
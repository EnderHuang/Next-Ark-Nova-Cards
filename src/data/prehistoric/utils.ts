export const addPrehistoricPrefix = (id: string | number): string => {
  const paddedId = String(id).padStart(2, '0');
  return `8${paddedId}`;
};

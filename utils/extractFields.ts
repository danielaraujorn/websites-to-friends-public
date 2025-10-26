/* eslint-disable @typescript-eslint/no-explicit-any */
export const extractFields = <T extends { fields: any }>(input: T) => {
  const fields = input.fields;
  for (const field in fields) {
    if (typeof fields[field] === 'object' &&
      fields[field] !== null &&
      fields[field] !== undefined) {

      // Handle arrays
      if (Array.isArray(fields[field])) {
        fields[field] = fields[field].map((item: any) => {
          if (typeof item === 'object' && item !== null && 'fields' in item) {
            return extractFields(item as { fields: any });
          }
          return item;
        });
      }
      // Handle objects with fields property
      else if ('fields' in fields[field]) {
        fields[field] = extractFields(fields[field] as { fields: any });
      }
    }
  }
  return input.fields;
};
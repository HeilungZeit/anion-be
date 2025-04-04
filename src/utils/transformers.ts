type ObjectWithSnakeCase = {
  [key: string]: any;
};

const snakeToCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};

export const transformToCamelCase = <T>(data: ObjectWithSnakeCase): T => {
  if (Array.isArray(data)) {
    return data.map((item) => transformToCamelCase(item)) as unknown as T;
  }

  if (data !== null && typeof data === 'object') {
    const transformed: ObjectWithSnakeCase = {};

    Object.keys(data).forEach((key) => {
      const camelKey = snakeToCamelCase(key);
      const value = data[key];

      transformed[camelKey] =
        value !== null && typeof value === 'object'
          ? transformToCamelCase(value)
          : value;
    });

    return transformed as T;
  }

  return data as T;
};

const camelToSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const transformToSnakeCase = <T>(data: ObjectWithSnakeCase): T => {
  if (Array.isArray(data)) {
    return data.map((item) => transformToSnakeCase(item)) as unknown as T;
  }

  if (data !== null && typeof data === 'object') {
    const transformed: ObjectWithSnakeCase = {};

    Object.keys(data).forEach((key) => {
      const snakeKey = camelToSnakeCase(key);
      const value = data[key];

      transformed[snakeKey] =
        value !== null && typeof value === 'object'
          ? transformToSnakeCase(value)
          : value;
    });

    return transformed as T;
  }

  return data as T;
};

export const addHttps = (obj: any): any => {
  if (!obj) return obj;

  if (typeof obj === 'string' && obj.startsWith('//')) {
    return `https:${obj}`;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => addHttps(item));
  }

  if (typeof obj === 'object') {
    const newObj = { ...obj };
    for (const key in newObj) {
      newObj[key] = addHttps(newObj[key]);
    }
    return newObj;
  }

  return obj;
};

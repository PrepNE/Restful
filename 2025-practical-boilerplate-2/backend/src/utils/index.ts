export function sanitizeBigInt(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeBigInt);
  }

  if (obj && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'bigint') {
        newObj[key] = Number(value); // or value.toString() if precision matters
      } else if (typeof value === 'object') {
        newObj[key] = sanitizeBigInt(value);
      } else {
        newObj[key] = value;
      }
    }
    return newObj;
  }

  return obj;
}

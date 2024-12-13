export function hasMissingValues(obj: Record<string, any>): boolean {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        console.log(`Missing or invalid value for key: ${key}`);
        return true;
      }
    }
    return false;
  }
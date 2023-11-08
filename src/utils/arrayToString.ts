export function arrayToString(array: string[] | string): string {
  if (Array.isArray(array)) {
    return array.join(', ');
  } else if (typeof array === 'string') {
    return array;
  }
  return '';
}
export function formatName(lastName: string, firstName: string | undefined): string {
  const initial = firstName?.charAt(0) || '';
  const formattedName = `${lastName} ${initial}`;
  return formattedName;
}

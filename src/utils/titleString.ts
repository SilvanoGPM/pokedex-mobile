export function titleString(str: string): string {
  const [firstletter] = str;

  const rest = str.slice(1);

  return `${firstletter.toUpperCase()}${rest}`;
}

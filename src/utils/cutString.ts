export const cutString = (
  text: string,
  range: [number, number] = [0, 135],
  limit: number = 20
): string => {
  return text.length > limit ? `${text.slice(range[0], range[1])}...` : text;
};

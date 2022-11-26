export const cutString = (
  text: string,
  range: [number, number] = [0, 135],
  limit = 20
) => {
  return text.length > limit ? `${text.slice(range[0], range[1])}...` : text;
};

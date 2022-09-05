export const cutString = (text: string): string => {
  return text.length > 20 ? `${text.slice(0, 135)}...` : text;
};

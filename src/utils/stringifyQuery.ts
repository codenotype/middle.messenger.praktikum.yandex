export const stringifyQuery = (query: any) => {
  if (typeof query === 'string') {
    return query;
  }

  const arr = Object.entries(query);

  return arr.reduce((prev, [k, v], i) => {
    return prev + `${k}=${v}${i === arr.length - 1 ? '' : '&'}`;
  }, '?');
};

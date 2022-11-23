import Block from './react/Block';

type Indexed<T = any> = {
  [key in string]: T;
};

export const isObject = (object: unknown): boolean => {
  return object !== null && typeof object === 'object';
};

export function isEqual<T extends Record<string, any>>(a: T, b: T): boolean {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  const res = Object.entries(a).map(([keyA, valueA]) => {
    const valueB = b[keyA];

    if (isObject(valueA) && isObject(valueB)) {
      return isEqual(valueA, valueB);
    }

    if (valueA === valueB) {
      return true;
    }

    return false;
  });

  return res.every(Boolean);
}

export const renderBlock = (query: string, block: Block) => {
  const root = document.querySelector(query) as HTMLElement;
  const content = block.getContent();

  if (root === null || content === null) {
    throw new Error(`Could not find selector: ${query} or component ${block}`);
  }

  root.innerHTML = '';
  root.appendChild(content);

  return root;
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  for (let p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
};

export const set = (
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as Indexed, result);
};

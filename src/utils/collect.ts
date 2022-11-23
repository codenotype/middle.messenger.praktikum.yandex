import Validator from './Validator';

export const collect = (event: SubmitEvent) => {
  event.preventDefault();

  const val = new Validator();
  const target = event.target as HTMLFormElement;
  const formDataArray = [...new FormData(target).entries()];
  let isValid = formDataArray.every(([input, value]) => {
    return val.validate(input, value as string);
  });

  const data = Object.fromEntries(formDataArray);

  if ('password_again' in data && data?.password_again !== data?.password) {
    isValid = false;
  }

  return { isValid, data };
};

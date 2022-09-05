import Validator from './Validator';

export const collect = (event: SubmitEvent) => {
  event.preventDefault();

  const val = new Validator();
  const target = event.target as HTMLFormElement;
  const formDataArray = [...new FormData(target).entries()];
  const isValid = formDataArray.every(([input, value]) => {
    return val.validate(input, value as string);
  });

  // валидация отключена для сбора любых данных
  formDataArray.forEach((item) => {
    console.log(item);
  });

  return isValid;
};

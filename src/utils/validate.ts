import Validator from './Validator';

export const validateInput = (event: any) => {
  const target = event.target as HTMLInputElement;

  if (target.tagName === 'BUTTON') {
    return;
  }

  const val = new Validator();
  const isValid = val.validate(target.name, target.value as string);
  const label = target.closest('div')?.querySelector('label');
  const color = document.querySelector('.profile')
    ? 'rgba(58, 182, 122, 1)'
    : 'silver';

  if (label && label.textContent !== '') {
    label.style.color = isValid ? color : 'lightcoral';
  } else {
    target.style.outline = isValid ? 'none' : '2px dashed lightcoral';
  }

  return isValid;
};

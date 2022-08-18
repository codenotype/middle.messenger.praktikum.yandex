import { errorPage } from './error.tmpl';
import { render } from '../../utils/render';

window.addEventListener('DOMContentLoaded', () => {
  const data404 = {
    code: '404',
    message: 'Oops, the page doesn’t exist',
  };

  const data500 = {
    code: '500',
    message: 'Sorry, we’re already fixing it',
  };

  render('#btn-404', errorPage, data404);
  render('#btn-500', errorPage, data500);
});

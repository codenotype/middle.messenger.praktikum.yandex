import Handlebars from 'handlebars';
import Block from './react/Block';

/**
 * Формирует HTML внутри #app (для читсых шаблонов)
 * @param buttonId - ключ hmtl-кнопки
 * @param template - html-шаблон
 * @param variables - объект с переменными для шаблона
 */
export const render = (
  buttonId: string,
  template: string,
  variables: {
    [key in string]: any;
  }
) => {
  const button = document.querySelector(buttonId);
  const app = document.querySelector('#app');

  if (button !== null && app !== null) {
    button.addEventListener('click', () => {
      const renderHbs = Handlebars.compile(template);

      app.innerHTML = renderHbs(variables);
    });
  }
};

/**
 * Формирует HTML внутри #app (для компонентов)
 * @param buttonId - ключ hmtl-кнопки
 * @param page - html-шаблон
 */
export const renderPage = (buttonId: string, page: Block) => {
  const button = document.querySelector(buttonId);
  const app = document.querySelector('#app');
  const block = page.getContent();

  if (button !== null && app !== null && block !== null) {
    button.addEventListener('click', () => {
      app.innerHTML = '';
      app.append(block);
      page.dispatchComponentDidMount();
    });
  }
};

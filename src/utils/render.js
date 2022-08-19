import Handlebars from 'handlebars';

/**
 * Формирует HTML внутри #app
 * @param {string} buttonId - ключ hmtl-кнопки
 * @param {string} template - html-шаблон
 * @param {object} variables - объект с переменными для шаблона
 */
export const render = (buttonId, template, variables) => {
  const button = document.querySelector(buttonId);

  button.addEventListener('click', () => {
    const app = document.querySelector('#app');
    const render = Handlebars.compile(template);

    app.innerHTML = render(variables);
  });
};

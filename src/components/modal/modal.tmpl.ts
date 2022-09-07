export const modalLoad = `
  <div class="modal">
    <h1>{{ title }}</h1>
    <div class="modal__load">
      <label for="file-input">{{ label }}</label>
      <input class="hidden" type="file" name="file-input" id="file-input" />
    </div>
    {{{ ButtonLoad }}}
  </div>
`;

export const modalUser = `
  <div class="modal">
    <h1>{{ title }}</h1>
    {{{ InputLogin }}}
    {{{ ButtonAction }}}
  </div>
`;
export const modalLoad = `
  <form id="form-load">
    <div class="modal modal_hidden modal_load">
      <h1>{{ title }}</h1>
      {{{ InputFile }}}
      {{{ ButtonLoad }}}
      {{{ ButtonClose }}}
    </div>
  </form>
`;

export const modalUser = `
  <form method="POST">
    <div class="modal modal_hidden modal_user">
      <h1>{{ title }}</h1>
      {{{ InputLogin }}}
      {{{ ButtonAction }}}
      {{{ ButtonClose }}}
    </div>
  </form>
`;
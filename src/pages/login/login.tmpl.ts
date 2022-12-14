export const loginForm = `
  <form id="auth" class="form">
    <h1>{{ formTitle }}</h1>
    {{{ LoginInput }}}
    {{{ PasswordInput }}}
    {{{ ButtonLogin }}}
    
    {{{ Link }}}
  </form>
`;

export const createAccountForm = `
  <form id="account" class="form form_create-account">

    <h1>{{ formTitle }}</h1>

    {{{ InputLogin }}}
    {{{ InputEmail }}}
    {{{ InputFirstName }}}
    {{{ InputSecondName }}}
    {{{ InputPhone }}}
    {{{ InputPassword }}}
    {{{ InputPasswordAgain }}}
    {{{ ButtonAccount  }}}

    {{{ Link }}}

  </form>
`;


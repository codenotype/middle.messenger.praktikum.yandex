export const profile = `
  <form class="profile">
    {{{ Avatar }}}
    <div class="profile__inputs">
      {{{ InputLogin }}}
      {{{ InputEmail }}}
      {{{ InputFirstName }}}
      {{{ InputSecondName }}}
      {{{ InputPhone }}}
      {{{ InputChatName }}}
    </div>
    <div class="profile__buttons">
      {{{ ButtonEdit }}}
      {{{ ButtonPassword }}}
      {{{ ButtonLogOut }}}
    </div>
  </form>
`;

export const changePassword = `
  <form class="profile">
    {{{ Avatar }}}
    <div class="profile__inputs profile__inputs_password">
      {{{ InputOldPassword }}}
      {{{ InputNewPassword }}}
      {{{ InputNewPasswordConfirm }}}
    </div>

    <div class="profile__buttons">
      {{{ ButtonSavePassword }}}
    </div>
  </form>
`;

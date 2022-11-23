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
      {{{ ButtonChats }}}
      {{{ ButtonEdit }}}
      {{{ ButtonPassword }}}
      {{{ ButtonLogOut }}}
    </div>
    {{{ ModalLoad }}}
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
      {{{ ButtonBack }}}
      {{{ ButtonSavePassword }}}
    </div>
  </form>
`;

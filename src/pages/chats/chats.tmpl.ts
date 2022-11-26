export const chats = `
  <div class="chats">
    <div class="chats__left-panel">
      {{{ InputChat }}}
      <div class="chats__list">
        {{{ Chats }}}
      </div>
      {{{ ButtonChatCreate }}}
    </div>
    {{#if chatSelected }}
    <div class="chats__chat">
      <header>
        <h1 class="chats__title">{{ selectedChatTitle }}</h1>
        <div class="chats__absolute">
          {{{ ButtonAddUser }}}
          {{{ ButtonDeleteUser }}}
          {{{ ButtonProfile }}}
        </div>
      </header>
      <div class="chats__messages">
        {{{ ChatMessages }}}
      </div>
      <div style="display: flex">
        {{{ InputMessage }}}
        {{{ ButtonSendMessage }}}
        {{{ ButtonSendFile }}}
      </div>
    </div>
    {{else}}
    <div class="chats__choose-chat">
      <div class="chats__absolute">
        {{{ ButtonProfile }}}
      </div>
      <h1>Выберите чат</h1>
    </div>
    {{/if}}
    {{{ ModalLoad }}}
  </div>
`;
export const chats = `
  <div class="chats">
    <div class="chats__left-panel">
      {{{ InputChat }}}
      <div class="chats__list">
        {{{ CardChat }}}
        {{{ CardChat2 }}}
      </div>
    </div>
    <div class="chats__chat">
      <header>
        <h1 class="chats__title">{{ selectedChatTitle }}</h1>
        <div class="chats__options">
          <img src={{ settingsIcon }} alt="settings-icon">
        </div>
        {{{ MenuSettings }}}
      </header>
      <div class="chats__messages">
        {{{ ChatMessage }}}
        {{{ ChatMessageOwn }}}
      </div>
      {{{ MenuAttach }}}
      {{{ InputMessage }}}
    </div>
  </div>
`;
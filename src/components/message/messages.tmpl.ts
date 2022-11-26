const chatMessageTest = `
  <div 
    {{#if own }}
    class="message-chat message-chat_own"
    {{else}}
    class="message-chat"
    {{/if}}
  >
    <div class="message-chat__title">
      {{#if own }}
      {{else}}
      <p>{{ username }}</p>
      {{/if}}
    </div>
    <div 
      {{#if own }}
      class="message-chat__content message-chat__content_own"
      {{else}}
      class="message-chat__content"
      {{/if}}
    >
      <p class="message-chat__text">{{ message }}</p>
      <p class="message-chat__time">{{ time }}</p>
    </div>
  </div>
`;

export const messages = {
  chatMessageTest,
};

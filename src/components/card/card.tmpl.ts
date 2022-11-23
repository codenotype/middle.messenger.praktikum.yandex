const cardChat = `
  <div 
    class="card" 
    id={{ id }} 
    {{#if selected}} style="background-color: rgba(0, 0, 0, 0.3)" {{/if}}
  >
    <div class="card__image">
      <img src={{ src }} alt="chat-icon">
    </div>

    <h2 class="card__title">{{ title }}</h2>
    <p class="card__message">
      {{#if you }}
      <span class="card__user">{{ you }}:</span>
      {{/if}}
      {{ lastMessage }}
    </p>

    <p class="card__time"><time>{{ time }}</time></p>

    <div class="card__notification">
      <p>{{ notifications }}</p>
    </div>
    {{{ ButtonCardDelete }}}
  </div>
`;

export const cards = {
  cardChat
};

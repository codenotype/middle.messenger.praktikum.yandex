const cardChat = `
  <div class="card">

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

    <p class="card__time">{{ time }}</p>

    <div class="card__notification">
      <p>{{ notifiationsNumber }}</p>
    </div>
  </div>
`;

export const cards = {
  cardChat,
};

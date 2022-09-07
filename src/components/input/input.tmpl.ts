// partials' blocks
const input = `
  <input 
    {{#if id}}
    id="{{ id }}"
    name="{{ id }}"
    {{/if}}
    {{#if type}}
    type="{{ type }}"
    {{else}}
    type="text"
    {{/if}}
    {{#if val}}
    value="{{ val }}"
    {{/if}}
  >
`;

const label = `
  <label htmlFor="{{ id }}">{{ label }}</label>
`;

// partials
const inputBase = `
  <div class="input">
    ${label}
    ${input}
  </div>
`;

const inputProfile = `
  <div class="input input_profile">
    ${label}
    ${input}
    <div class="input__wrapper"></div>
  </div>
`;

const inputChat = `
  <div class="input input_chat">
    <div class="input__chat-wrapper">
      <img src={{ src }} alt="action-icon">
      {{{ Input }}}
    </div>
  </div>
`;

export const inputs = {
  inputBase,
  inputProfile,
  inputChat,
};

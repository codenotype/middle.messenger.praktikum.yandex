export const option = `
  <div class="menu__option">
    <img class="{{ rotated }}" src={{ icon }}></img>
    <p>{{ label }}</p>
  </div>
`;

export const menu = `
  <div
    class="{{ classes }}"
  >
    {{{ OptionOne }}}
    {{{ OptionTwo }}}
    {{{ OptionThree }}}
  </div>
`;

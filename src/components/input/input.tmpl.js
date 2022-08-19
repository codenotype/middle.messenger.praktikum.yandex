export const inputBase = `
  <div class="input">
    <label htmlFor={{ id }}>{{ label }}</label>
    <input id={{ id }} name={{ id }} type={{ type }} value={{ val }}>
  </div>
`;

export const inputProfile = `
  <div class="input input_profile">
    <label htmlFor={{ id }}>{{ label }}</label>
    <div class="input__wrapper">
      <input id={{ id }} name={{ id }} type={{ type }} value={{ val }}>
      <p>{{ action }}</p>
    </div>
  </div>
`;

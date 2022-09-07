export const avatar = `
  <div class="avatar">
    <label for="avatar">
      <img src={{ source }} alt="avatar">
    </label>
    <input class="hidden" type="file" 
      {{#if id}} name="{{ id }}" id="{{ id }}" {{/if}} 
    />
  </div>
`;

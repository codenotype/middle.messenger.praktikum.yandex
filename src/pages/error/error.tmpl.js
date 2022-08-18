export const errorPage = `
  <section class="error-page">
    <h1 class="large-text">{{ code }}</h1>
    <p class="bigger-text">{{ message }}</p>

    {{> buttonBase label="Back to home" }}
  </section>
`;
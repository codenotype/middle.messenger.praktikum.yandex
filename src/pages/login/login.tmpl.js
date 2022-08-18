export const loginForm = `
  <form class="form">
    <h1>{{ formTitle }}</h1>
    {{> inputBase id="login" label="Login" type="text" val=login }}
    {{> inputBase id="password" label="Password" type="password" val=password }}
    {{> buttonBase label="Sign in" }}
    <a href="#">{{ link }}</a>
  </form>
`;

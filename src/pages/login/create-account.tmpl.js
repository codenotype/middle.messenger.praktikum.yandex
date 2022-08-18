export const createAccountForm = `
  <form class="form form_create-account">

    <h1>{{ formTitle }}</h1>

    {{> inputBase id="login" label="Login" type="text" val=login }}
    {{> inputBase id="email" label="Email" type="email" val=email }}
    {{> inputBase id="first_name" label="First name" type="text" val=first_name }}
    {{> inputBase id="second_name" label="Last name" type="text" val=second_name }}
    {{> inputBase id="phohe" label="Phone" type="tel" val=phone }}
    {{> inputBase id="password" label="Password" type="password" val=password }}
    {{> inputBase id="password-again" label="Password (again)" type="password" val=password }}

    {{> buttonBase label="Create account" }}

    <a href="#">{{ link }}</a>

  </form>
`;
export const profile = `
  <main class="profile">
    {{> avatar source='' }}

    <div class="profile__inputs">
      {{> inputProfile id="login" label="Login" type="text" action="edit" val=login  }}
      {{> inputProfile id="email" label="Email" type="email" val=email action="edit" }}
      {{> inputProfile id="first_name" label="First name" type="text" val=first_name action="edit" }}
      {{> inputProfile id="second_name" label="Last name" type="text" val=second_name action="edit" }}
      {{> inputProfile id="phone" label="Phone" type="tel" val=phone action="edit" }}
      {{> inputProfile id="display_name" label="Chat name" type="text" val=display_name action="edit" }}
    </div>

    <div class="profile__buttons">
      {{> buttonBase label="Change password" }}
      {{> buttonDanger label="Log out" }}
    </div>
  </main>
`;
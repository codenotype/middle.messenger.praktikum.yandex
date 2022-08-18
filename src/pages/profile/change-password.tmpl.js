export const profilePassword = `
  <main class="profile">
    {{> avatar source='' }}

    <div class="profile__inputs profile__inputs_password">
      {{> inputProfile id="oldPassword" label="Old password" type="password" val=oldPassword  action="show" }}
      {{> inputProfile id="newPassword" label="New password" type="password" val=newPassword  action="show" }}
      {{> inputProfile id="newPasswordAgain" label="New password (again)" type="password" val=newPassword  action="show" }}
    </div>

    <div class="profile__buttons">
      {{> buttonBase label="Save changes" }}
    </div>
  </main>
`;
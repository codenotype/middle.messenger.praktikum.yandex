import { profile } from './profile.tmpl'
import { profilePassword } from './change-password.tmpl'
import { render } from '../../utils/render';
import avatarSvg from '../../icons/user-astronaut-solid.svg'

window.addEventListener('DOMContentLoaded', () => {
  const profileData = {
    login: 'vano',
    email: 'ivan@ya.ru',
    first_name: 'ivan',
    second_name: 'ivanov',
    phone: '+71234567890',
    display_name: 'vanja',
    avatar: avatarSvg, 
  }

  const passwordData = {
    oldPassword: '123467',
    newPassword: '321467',
    avatar: avatarSvg,
  }

  render('#btn-profile', profile, profileData)
  render('#btn-profile-change', profilePassword, passwordData)
})
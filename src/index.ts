import './components';
import './pages';
import { ChatsPage } from './pages/chats';
import { ErrorPage404, ErrorPage500 } from './pages/error';
import { AuthForm, AccountForm } from './pages/login';
import { ProfilePage, ProfilePagePasswordChange } from './pages/profile';
import router from './utils/router/Router';
import { routes } from './utils/router/types';
import './index.scss';

window.addEventListener('DOMContentLoaded', () => {
  router
    .use(routes.index, AuthForm)
    .use(routes.signup, AccountForm)
    .use(routes.chats, ChatsPage)
    .use(routes.profile, ProfilePage)
    .use(routes.password, ProfilePagePasswordChange)
    .use(routes.notFound, ErrorPage404)
    .use(routes.serverError, ErrorPage500)
    .start();
});

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: number;
  avatar: string;
}

export type UserProfile = Omit<User, 'id' | 'avatar'>;

export interface UserPasswords {
  oldPassword: string;
  newPassword: string;
}

export interface Chat {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  } | null;
}

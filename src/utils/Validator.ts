export default class Validator {
  /* 
  от 3 до 20 символов, латиница, 
  может содержать цифры, но не состоять из них, без пробелов, 
  без спецсимволов (допустимы дефис и нижнее подчёркивание).
  */
  checkLogin(login: string): boolean {
    /* eslint-disable */
    return /^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/.test(login);
  }

  /* 
  латиница или кириллица, первая буква должна быть заглавной, 
  без пробелов и без цифр, нет спецсимволов (допустим только дефис).
  */
  checkName(name: string): boolean {
    /* eslint-disable */
    return /^[A-Z][а-яА-ЯёЁa-zA-Z0-9\-]+$/.test(name);
  }

  /*  
  латиница, может включать цифры и спецсимволы вроде дефиса, 
  обязательно должна быть «собака» (@) 
  и точка после неё, но перед точкой обязательно должны быть буквы. 
  */
  checkEmail(mail: string): boolean {
    /* eslint-disable */
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      mail
    );
  }

  /* 
  от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
  */
  checkPassword(password: string) {
    const isInRangeWithNumbers = /[a-z0-9]{8,40}/i.test(password);
    const isCapital = /[A-Z]/.test(password);

    return isInRangeWithNumbers && isCapital;
  }

  /* 
  от 10 до 15 символов, состоит из цифр, может начинается с плюса.
  */
  checkPhone(phone: string): boolean {
    return /^\+?[0-9]{10,15}/.test(phone);
  }

  // не должно быть пустым.
  checkMessage(message: string) {
    return message !== '';
  }

  validate(inputType: string, value: string) {
    switch (inputType) {
      case 'login':
        return this.checkLogin(value);
      case 'password':
        return this.checkPassword(value);
      case 'email':
        return this.checkEmail(value);
      case 'phone':
        return this.checkPhone(value);
      default:
        return this.checkMessage(value);
    }
  }
}

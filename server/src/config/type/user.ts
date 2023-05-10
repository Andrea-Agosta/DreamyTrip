export interface IBodyUserLogin {
  email: string;
  password: string;
}

export interface IBodyUser extends IBodyUserLogin {
  role: string;
  storeId: number;
  storeName: string;
}

export interface IUpdateBodyUser extends IBodyUser {
  storeName: string;
}

export interface IUser extends IBodyUser {
  id: number;
}

export interface IRegistrationUser extends IUser {
  confirmed_password: string;
  userNotFound: string;
  [key: string]: any;
}

export interface IUserState {
  user: {
    email: string;
    role: string;
    storeId: string;
  };
}
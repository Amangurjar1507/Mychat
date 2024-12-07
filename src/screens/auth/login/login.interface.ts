import {Dispatch, SetStateAction} from 'react';

export interface ErrorObject {
  emailError: string | undefined;
  passwordError: string | undefined;
}

export interface LoginHooks {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  hideShow: boolean;
  setHideShow: Dispatch<SetStateAction<boolean>>;
  onLogin: () => void;
  onForgotPassword: () => void;
  loading: boolean;
  errorObject: ErrorObject;
  validationLogin: () => void;
  navigation: any;
  languageData: () => void;
}

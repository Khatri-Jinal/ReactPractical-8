import { SUBMIT_FORM, LOGOUT } from "./formTypes";

export interface userDetailType {
  photo: string | null,
  name: string | null,
  email: string | null,
  phone: string | null,
  password: string | null,
  cpassword: string | null
}

export interface SubmitLogoutType {
  type: string,
  payload: userDetailType,
  login: boolean
}

const submitForm = (userDetail: userDetailType,) => {
  return {
    type: SUBMIT_FORM,
    payload: userDetail,
    login: true
  };
};

export const logOut = () => {
  return {
    type: LOGOUT,
    login: false
  };
};

export default submitForm;